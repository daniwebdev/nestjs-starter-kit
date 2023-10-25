import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}


  get repo() { return this.userRepository; }

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await hash(password, 10);
    const newUser = this.repo.create({ password: hashedPassword, ...rest });
    const createdUser = await this.repo.save(newUser);
    return createdUser;
  }

  findAll() {

    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    return await this.repo.update(id, updateUserDto);
  }

  remove(id: number) {
    // delete with typeorm
    return this.repo.delete(id);
  }
}
