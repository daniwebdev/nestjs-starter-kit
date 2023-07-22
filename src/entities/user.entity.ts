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
  phoneVerifiedAt: Date;

  @Column()
  email: string;

  @Column({
    name: 'email_verified_at'
  })
  emailVerifiedAt: Date;

  @Column()
  password: string;

  @Column({
    name: 'telegram_account'
  })
  telegramAccount: string;

  @Column({
    name: 'telegram_chat_id'
  })
  telegramChatId: string;

  @Column({
    name: 'telegram_verified_at'
  })
  telegramVerifiedAt: Date;

  @Column({
    name: 'member_id'

  })
  memberId: number;

  @Column({
    name: 'member_package_id'
  })
  memberPackageId: number;

  @Column({
    name: 'member_subscription_id'
  })
  memberSubscriptionId: number;

  @Column({
    name: 'member_status'
  })
  memberStatus: string;

  @Column('json')
  coordinate: coordinateType;

  @Column({
    type: 'json',
    name: 'current_login'
  })
  currentLogin: currentLoginType;

  @Column({
    type: 'json',
    name: 'current_login'
  })
  lastLogin: currentLoginType;
}

type coordinateType = {
  latitude: number;
  longitude: number;
}


type currentLoginType = {
  "ip": string,
  "app": string,
  "device": string,
  "device_id": string,
  "timestamp": number,
  "coordinate": coordinateType,
}