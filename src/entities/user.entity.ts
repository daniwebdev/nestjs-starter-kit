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

  @Column({
    name: 'phone_verified_at'
  })
  phone_verified_at: Date;
  //phoneVerifiedAt: Date;

  @Column()
  email: string;

  @Column({
    name: 'email_verified_at'
  })
  email_verified_at: Date;
  //emailVerifiedAt: Date;

  @Column()
  password: string;

  @Column({
    name: 'telegram_account'
  })
  telegram_account: string;
  //telegramAccount: string;

  @Column({
    name: 'telegram_chat_id'
  })
  telegram_chat_id: string;
  //telegramChatId: string;

  @Column({
    name: 'telegram_verified_at'
  })
  telegram_verified_at: Date;
  //telegramVerifiedAt: Date;

  @Column({
    name: 'member_id'
  })
  member_id: number;
  //memberId: number;

  @Column({
    name: 'member_package_id'
  })
  member_package_id: number;
  //memberPackageId: number;

  @Column({
    name: 'member_subscription_id'
  })
  member_subscription_id: number;
  //memberSubscriptionId: number;

  @Column({
    name: 'member_status'
  })
  member_status: string;
  //memberStatus: string;

  @Column('json')
  coordinate: coordinateType;

  @Column({
    type: 'json',
    name: 'current_login'
  })
  currentLogin: CurrentLoginType;

  @Column({
    type: 'json',
    name: 'current_login'
  })
  lastLogin: CurrentLoginType;
}

type coordinateType = {
  latitude: number;
  longitude: number;
}


type CurrentLoginType = {
  ip: string,
  app: string,
  device: string,
  device_id: string,
  timestamp: number,
  coordinate: coordinateType,
}