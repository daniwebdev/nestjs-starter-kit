import { CurrentLoginType } from "src/apps/auth/types";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'user_devices'
})
export class UserDevice {
    @PrimaryColumn()
    id: string;

    @Column({name: 'user_id'})
    userId: string;

    @Column({name: 'unique_id'})
    uniqueId: string;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    os: string;

    @Column()
    platform: string;

    @Column('json', {name: 'last_login'})
    lastLogin: CurrentLoginType;

    @Column('json', {name: 'current_login'})
    currentLogin: CurrentLoginType;

    @Column({name: 'access_token'})
    accessToken: string;

    @Column({name: 'refresh_token'})
    refreshToken: string;

    @Column({name: 'fcm_token'})
    fcmToken: string;

    @Column()
    preference: string;

    @Column()
    status: string;

    @Column({name: 'status_reason'})
    statusReason: string;

}
