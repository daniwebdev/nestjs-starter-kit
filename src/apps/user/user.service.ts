import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly i18n: I18nService,
    ) { }


    async getUser(userAuth: UserInAuth) {
        console.log(userAuth);

        const getUser = await this.userRepository.findOne({
            where: {
                id: userAuth.id,
            },
            select: {
                id: true,
                code: true,
                referral: true,
                uuid: true,
                username: true,
                name: true,
                avatar: true,
                phone: true,
                phone_verified_at: true,
                email: true,
                email_verified_at: true,
            }
        })

        delete getUser.id;

        return getUser;
    }


    updateUserData(formData: UpdateUserDTO, user: UserInAuth) {

        //
        
    }

    async checkAvailability(username: string) {
        
        try {
            await this.userRepository.findOneByOrFail({
                username: username
            });

            throw new HttpException(this.i18n.t("user.availability.usernameIsNotAvailable"), HttpStatus.FORBIDDEN);

        } catch (error) {
            return this.i18n.t('user.availability.usernameIsAvailable');
        }
    }
}
// 