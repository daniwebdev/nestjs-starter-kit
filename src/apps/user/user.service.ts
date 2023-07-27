import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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
                referral_code: true,
                referral_link: true,
                uuid: true,
                username: true,
                name: true,
                avatar: true,
                phone: true,
                phone_verified_at: true,
                email: true,
                email_verified_at: true,
                // password: true,
                // updated_at: true,
                // created_at: true,
            }
        })

        delete getUser.id;

        return getUser;
    }


    updateUserData(formData: UpdateUserDTO, user: UserInAuth) {

        //
        
    }
}
// 