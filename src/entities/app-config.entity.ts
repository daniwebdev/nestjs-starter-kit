import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "setting_apps"
})
export class AppConfig {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    group: string
}