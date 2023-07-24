import { strRandom } from 'src/utils';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { v4 } from 'uuid'
@Entity({
    name: 'users'
})
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  referral_code: string;

  @Column({
    nullable: true,
  })
  referral_link: string;

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

  @Column()
  email: string;

  @Column({
    name: 'email_verified_at'
  })
  email_verified_at: Date;

  @Column()
  password: string;

  @Column({
    name: 'telegram_account'
  })
  telegram_account: string;

  @Column({
    name: 'telegram_chat_id'
  })
  telegram_chat_id: string;

  @Column({
    name: 'telegram_verified_at'
  })
  telegram_verified_at: Date;

  @Column({
    name: 'member_id'
  })
  member_id: number;

  @Column({
    name: 'member_package_id'
  })
  member_package_id: number;

  @Column({
    name: 'member_subscription_id'
  })
  member_subscription_id: number;

  @Column({
    name: 'member_status'
  })
  member_status: string;

  @UpdateDateColumn()
  updated_at: Date
  
  @CreateDateColumn()
  created_at: Date

  @BeforeInsert()
  beforeInsert() {
    this.code = strRandom(6)
    this.uuid = v4()
  }

}
