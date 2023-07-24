import {  HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(UserDevice) private userDevicesRepository: Repository<UserDevice>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(data: LoginDTO) {
        const user = await this.getUser([
            {username: data.identity,},
            {email: data.identity,},
            {phone: data.identity,},
        ]);

        if (!user || !this.checkPassword(data.password, user.password)) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.getTokens(user);

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
            const newUser = manager.create(User, {
                name,
                username,
                email,
                phone,
                password: hashedPassword,
            });

            // Save the user in the database
            await manager.save(newUser);

            const tokens = await this.getTokens(newUser);

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

            delete newUser.password;

            // Return any additional information you may want to provide after successful registration
            // For example, you can return the newly created user entity with sensitive information (like password) removed.
            const { password: _, ...registeredUser } = newUser;
            return {
                tokens: tokens,
                user: newUser
            };
        }).catch(error => {
            throw error;
        })

      }

    async getTokens(user: User) {
        return {
            access_token: await this.jwtService.signAsync({
                username: user.name,
                id: user.id,
            }, {
                secret: this.configService.get("JWT_SECRET"),
                expiresIn: 60*15,
            }),
            refresh_token: await this.jwtService.signAsync({
                id: user.id,
                deviceId: 1
            }, {
                secret: this.configService.get("JWT_SECRET"),
                expiresIn: 60 * 60 * 24 * 7,
            }),
        }
    }

    private makeHash(data: string) {
        return hash(data, 10);
    }

    private async checkPassword(inputPassword: string, hashPassword) {
        const passwordHash = hashPassword.replace(/^\$2y(.+)$/i, '$2a$1');
        if(!await compare(inputPassword, passwordHash)) {
            /* password is not valid when compared with password in database */
            throw new UnauthorizedException('invalid credentials');
        }
    
        return true;
    }

    private getUser(condition: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
        return this.usersRepository.findOne({
            where: condition,
            select: {
                id: false,
                uuid: true,
                username: true,
                name: true,
                avatar: true,
                phone: true,
                phone_verified_at: true,
                email: true,
                email_verified_at: true,
                password: true,
                telegram_account: true,
                telegram_chat_id: true,
                telegram_verified_at: true,
                member_id: true,
                member_package_id: true,
                member_subscription_id: true,
                member_status: true,
            }
        });
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
