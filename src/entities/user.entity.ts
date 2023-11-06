import { strRandom } from 'src/common/utils';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 } from 'uuid'
import { Role } from './role.entity';
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
  role_id: string;

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

  @OneToOne(type => Role)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @BeforeInsert()
  beforeInsert() {
    this.code = strRandom(6)
    this.uuid = v4()
  }

}
