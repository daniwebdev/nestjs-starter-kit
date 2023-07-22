import { UnauthorizedException } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users'
})
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  phone: string;

  @Column()
  phoneVerifiedAt: Date;

  @Column()
  email: string;

  @Column()
  emailVerifiedAt: Date;

  @Column()
  password: string;

  @Column()
  telegramAccount: string;

  @Column()
  telegramChatId: string;

  @Column()
  telegramVerifiedAt: Date;

  @Column()
  memberId: number;

  @Column()
  memberPackageId: number;

  @Column()
  memberSubscriptionId: number;

  @Column()
  memberStatus: string;

  @Column('json')
  coordinate: coordinateType;

  @Column()
  currentLogin: Date;

  @Column()
  lastLogin: Date;
}

type coordinateType = {
  latitude: number;
  longitude: number;
}
