import { CurrentLoginType } from "src/apps/auth/types";
import { strRandom } from "src/utils";
import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'user_devices'
})
@Unique(['user_id', 'unique_id']) // Add a unique constraint on user_id and unique_id columns
export class UserDevice {
    @PrimaryColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({name: 'unique_id'})
    unique_id:string;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    os: string;

    @Column()
    platform: string;

    @Column('json', {name: 'last_login'})
    last_login:CurrentLoginType;

    @Column('json', {name: 'current_login'})
    current_login:CurrentLoginType;

    @Column({name: 'access_token'})
    access_token:string;

    @Column({name: 'refresh_token'})
    refresh_token:string;

    @Column({name: 'fcm_token'})
    fcm_token:string;

    @Column()
    preference: string;

    @Column()
    status: string;

    @Column({name: 'status_reason'})
    status_reason:string;

    @UpdateDateColumn()
    updated_at:Date;

    @CreateDateColumn()
    created_at: Date;

}
