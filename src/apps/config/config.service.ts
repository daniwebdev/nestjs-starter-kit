import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfig } from 'src/entities/app-config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigService {

    constructor(
        @InjectRepository(AppConfig) private appConfigService: Repository<AppConfig>
    ) { }

    async getConfig(configKey: string) {
        //

        let query = this.appConfigService.createQueryBuilder().from('setting_apps', 'conf').select('*')

        if (configKey != '' && configKey.indexOf('.') == -1) {
            query = query.where('conf.group = :group', {
                group: configKey
            })
        }
        const config = await query.execute();
        const results = {}

        config.forEach((item: { group: any, key: any, value: any }) => {
            let isAdded = false;
            const [primaryGroup, paramGroup] = configKey.split('.');

            if (paramGroup == undefined && configKey == item.group) {
                isAdded = true;
            }

            if (paramGroup != undefined) {
                if (primaryGroup == item.group) {
                    if (paramGroup == item.key) {
                        isAdded = true;
                    }
                }
            }

            if (configKey == '') isAdded = true;

            if (isAdded) {

                if (results[item.group] == undefined) {
                    results[item.group] = {};
                }

                if (results[item.group][item.key] == undefined) {
                    results[item.group][item.key] = {}
                }

                try {
                    results[item.group][item.key] = JSON.parse(item.value);
                } catch (error) {
                    results[item.group][item.key] = item.value;
                }
            }


        })

        return results;
    }
}
