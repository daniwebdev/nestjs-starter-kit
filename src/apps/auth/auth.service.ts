import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(data: LoginDTO) {
        //
        const user = await this.usersRepository.findOne({
            where: [
                {username: data.identity,},
                {email: data.identity,},
                {phone: data.identity,},
            ]
        });

        console.log(user)

        if (!user || !this.checkPassword(data.password, user.password)) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            username: user.name,
            email: user.email,
            id: user.id,
        }, {
            secret: this.configService.get("JWT_SECRET")
        });
        return { 
            token,
            user
         };
    }

    async register(data: RegisterDTO) {
        return {}
    }

    makeToken(user: User) {
        // create jwt token
        return 
    }



    private async checkPassword(inputPassword: string, hashPassword) {
        const passwordHash = hashPassword.replace(/^\$2y(.+)$/i, '$2a$1');
        if(!await compare(inputPassword, passwordHash)) {
            /* password is not valid when compared with password in database */
            throw new UnauthorizedException('invalid credentials');
        }
    
        return true;
      }
}
