import { CurrentLoginType } from "src/apps/auth/types";
import { strRandom } from "src/utils";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'user_devices'
})
export class UserDevice {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: number;
    // userId: string;

    @Column({name: 'unique_id'})
    unique_id:string;
    // uniqueId: string;

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
    // lastLogin: CurrentLoginType;

    @Column('json', {name: 'current_login'})
    current_login:CurrentLoginType;
    // currentLogin: CurrentLoginType;

    @Column({name: 'access_token'})
    access_token:string;
    // accessToken: string;

    @Column({name: 'refresh_token'})
    refresh_token:string;
    // refreshToken: string;

    @Column({name: 'fcm_token'})
    fcm_token:string;
    // fcmToken: string;

    @Column()
    preference: string;

    @Column()
    status: string;

    @Column({name: 'status_reason'})
    status_reason:string;
    // statusReason: string;

}
