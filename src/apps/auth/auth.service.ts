import {  HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { FindOptionsWhere, Repository } from 'typeorm'
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
        //
        const user = await this.getUser([
            {username: data.identity,},
            {email: data.identity,},
            {phone: data.identity,},
        ]);

        if (!user || !this.checkPassword(data.password, user.password)) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.getTokens(user);
        
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
        const hashedPassword = await this.hashPassword(password);
    
        // Create a new user entity
        const newUser = this.usersRepository.create({
          name,
          username,
          email,
          phone,
          password: hashedPassword,
        });
    
        // Save the user in the database
        await this.usersRepository.save(newUser);

        const tokens = await this.getTokens(newUser);

        const newUserDevice = this.userDevicesRepository.create({
            uniqueId: device.id,
            name: device.name,
            brand: device.brand,
            os: device.os,
            platform: req.header('x-app-platform') ?? 'unknown',
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            status: 'allowed',
            lastLogin: {
               ip: req.ip,
               app: req.header('x-app-platform'),
               app_version: req.header('x-app-version'),
               coordinate,
            //    app_version: req.header('x-app-version'),
            }
        })

        await this.userDevicesRepository.save(newUserDevice);
    
        // Return any additional information you may want to provide after successful registration
        // For example, you can return the newly created user entity with sensitive information (like password) removed.
        const { password: _, ...registeredUser } = newUser;
        return {tokens,...registeredUser};
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

    private hashPassword(data: string) {
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
            where: condition
        });
    }
}
