import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { Request } from 'express';
import { UserDevice } from 'src/entities/user-device.entity';
import { DeviceDTO } from './dto/device.dto';
import { RedisService } from 'src/shared/redis/redis.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
        @InjectRepository(UserDevice) 
        private userDevicesRepository: Repository<UserDevice>,
        private readonly i18n: I18nService,
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async logout(userAuth: UserInAuth) {

        try {
            console.log(userAuth.id)
            console.log(userAuth.deviceUniqueId);
            await this.userDevicesRepository.update({
                user_id: userAuth.id,
                unique_id: userAuth.deviceUniqueId,
            }, {
                access_token: null,
                refresh_token: null,
            })

            this.redisService.del(`user-data:${userAuth.id}`);

            return true;
        } catch (error) {
            return false;
        } finally {
            
        }
    }

    async refresh(req: Request) {

        const deviceUniqueId = req.user.deviceUniqueId;

        const device: UserDevice = await this.userDevicesRepository.findOneBy({
            user_id: req.user.id,
            unique_id: deviceUniqueId,
        });

        const token = req.header('authorization').replace('Bearer ', '');
        console.log(device.refresh_token)
        if(!await this.checkPassword(token, device.refresh_token ?? '')) {
            throw new HttpException(this.i18n.t('auth.refresh.invalid-token'), HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersRepository.findOneBy({
            id: req.user.id,
        })

        const deviceDTO = new DeviceDTO();
        deviceDTO.brand = device.brand;
        deviceDTO.id = device.unique_id;
        deviceDTO.name = device.name;
        deviceDTO.os = device.os;

        const tokens = await this.getTokens(user, deviceDTO);

       await this.userDevicesRepository.update({
            id: device.id,
        }, {
            refresh_token: await this.makeHash(tokens.refresh_token),
            access_token: await this.makeHash(tokens.access_token),
        })

        return {
            tokens
        };
    }

    async login(data: LoginDTO,  req: Request) {
        const user = await this.getUser([
            {username: data.identity,},
            {email: data.identity,},
            {phone: data.identity,},
        ], null, true);

        if (!user || !this.checkPassword(data.password, user.password)) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.getTokens(user, data.device);

        const userDevice = this.userDevicesRepository.create({
            user_id: user.id, // Associate with the newly created user
            unique_id: data.device.id,
            name: data.device.name,
            brand: data.device.brand,
            os: data.device.os,
            platform: req.header('x-app-platform') ?? 'unknown',
            access_token: await this.makeHash(tokens.access_token),
            refresh_token: await this.makeHash(tokens.refresh_token),
            status: 'allowed',
            last_login: {
                ip: req.ip,
                app_version: req.header('x-app-version'),
                timestamp: new Date().getTime(),
                coordinate: data.coordinate,
            },
        });
        try {
            await this.userDevicesRepository.save(userDevice);
        } catch (error) {
            await this.userDevicesRepository.update({
                user_id: userDevice.user_id,
                unique_id: userDevice.unique_id,
            }, userDevice);
        }

        delete user.password;

        return { 
            tokens,
            user
         };
    }

    async register(data: RegisterDTO, req: Request) {
        const { name, username, email, phone, password, device, coordinate } = data;
    
        // Check if the username, email, and phone number are unique in the database
        const existingUser = await this.usersRepository.findOne({
          where: [{ username }, { email }, { phone }],
        });
    
        if (existingUser) {
          throw new HttpException('Username, email, or phone number already exists.', HttpStatus.UNAUTHORIZED);
        }
    
        // Hash the password before saving it to the database
        const hashedPassword = await this.makeHash(password);
    
        return this.usersRepository.manager.transaction(async (manager: EntityManager) => {

            // Create a new user entity
            const user = manager.create(User, {
                name,
                username,
                email,
                phone,
                password: hashedPassword,
            });

            // Save the user in the database
            const newUser = await manager.save(user);

            const tokens = await this.getTokens(newUser, device);

            // Create and save the related user device using the userDevicesRepository
            const newUserDevice = manager.create(UserDevice, {
                user_id: newUser.id, // Associate with the newly created user
                unique_id: device.id,
                name: device.name,
                brand: device.brand,
                os: device.os,
                platform: req.header('x-app-platform') ?? 'unknown',
                access_token: await this.makeHash(tokens.access_token),
                refresh_token: await this.makeHash(tokens.refresh_token),
                status: 'allowed',
                last_login: {
                    ip: req.ip,
                    app_version: req.header('x-app-version'),
                    timestamp: new Date().getTime(),
                    coordinate,
                },
            });

            await manager.save(newUserDevice);


            const getUser = await this.getUser({
                id: newUser.id,
            }, manager)

            // Return any additional information you may want to provide after successful registration
            // For example, you can return the newly created user entity with sensitive information (like password) removed.
            return {
                tokens: tokens,
                user: getUser
            };
        }).catch(error => {
            throw error;
        })

      }

    async getTokens(user: User, device: DeviceDTO) {
        
        await this.redisService.set(`user-data:${user.id}`, user);

        return {
            access_token: await this.jwtService.signAsync({
                username: user.name,
                deviceUniqueId: device.id,
                id: user.id,
            }, {
                subject: new Date().getTime().toString() + ' | hi',
                secret: this.configService.get("JWT_SECRET"),
                expiresIn: eval(this.configService.get('JWT_EXP_AT')),
            }),
            refresh_token: await this.jwtService.signAsync({
                username: user.name,
                id: user.id,
                deviceUniqueId: device.id,
            }, {
                subject: new Date().getTime().toString() + ' | hi',
                secret: this.configService.get("JWT_SECRET_REFRESH"),
                // expiresIn: 60 * 60 * 24 * 7,
                expiresIn: eval(this.configService.get('JWT_REFRESH_EXP_AT')),
            }),
        }
    }

    private makeHash(data: string) {
        return hash(data, 10);
    }

    private async checkPassword(inputPassword: string, hashPassword:string) {
        const passwordHash = hashPassword.replace(/^\$2y(.+)$/i, '$2a$1');
        if(!await compare(inputPassword, passwordHash)) {
            /* password is not valid when compared with password in database */
            throw new UnauthorizedException('invalid credentials');
        }
    
        return true;
    }

    private getUser(condition: FindOptionsWhere<User> | FindOptionsWhere<User>[], manager?: EntityManager, withPassword?: boolean) {
        const _select = {
            id: withPassword ?? false,
            uuid: true,
            username: true,
            name: true,
            avatar: true,
            phone: true,
            phone_verified_at: true,
            email: true,
            email_verified_at: true,
            password: withPassword ?? false,
            telegram_account: false,
            telegram_chat_id: false,
            telegram_verified_at: false,
            member_id: false,
            member_package_id: false,
            member_subscription_id: false,
            member_status: false,
        }

        if(manager) {
            return manager.findOne(User, {
                where: condition,
                select: _select
            })
        }

        return this.usersRepository.findOne({
            where: condition,
            select: _select,
        })
    }

    async updateHashToken(deviceId: string, tokens: any) {

        this.userDevicesRepository.update({
            unique_id: deviceId,
        }, {
            access_token: await this.makeHash(tokens['access_token']),
            refresh_token: await this.makeHash(tokens['refresh_token']),
        })
    }
}
