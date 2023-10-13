import { strRandom } from 'src/common/utils';
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
  referral: string;

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
