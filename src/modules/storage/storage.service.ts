import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { GoogleCloudStorage } from './providers/gcs.provider';
import { ProviderStorage } from './providers/provider.abstract';
@Injectable()
export class StorageService {

    private environment = 'development';

    private providerInstance: ProviderStorage<any>;

    private domainURL: string;
    private provider: string;
    private prefixToReplace: any;

    constructor(
        private configService: ConfigService,
    ) {
        this.environment = this.configService.get('STORAGE_UPLOAD_PREFIX') ?? 'development';

        this.prefixToReplace = {
            'gcs': 'gcs://',
            's3': 's3://',
            'cloudinary': 'cld://'
        }
    }

    setProvider(provider: 'gcs') {
        this.provider = provider;

        // console.log(join(__dirname, '..', '..', 'service-account.json'))
        switch(provider) {
            case 'gcs': {
                this.domainURL = this.configService.get('GCS_DOMAIN_URL') ?? 'http://domain.com';
                this.providerInstance = new GoogleCloudStorage({
                    keyFile: require( join(__dirname, '..', '..', 'service-account.json')),
                    projectId: this.configService.get('GCS_PROJECT_ID') ?? 'intervest-io',
                }, { 
                    bucketName: this.configService.get('GCS_BUCKET_NAME') ??'intervest-io.appspot.com', 
                    prefix: this.environment 
                })

                break;
            }

            default: {
                throw Error('Storage Provider not available.')
            }
        }

        return this;
    }

    async put(destination: string, buffer: Buffer, mimetype?: string): Promise<{
        filename: string,
        path: string,
        url: string,
    }> {
        // const outputFile = {
        //     filename: 'gcs:' + destination +'/' + file.originalname,
        //     path: path,
        //     url: (await fileObj.getSignedUrl({
        //         action: 'read',
        //         expires: moment().add(2, 'days').toDate()
        //     }))[0],
        // }


        const thePrefix = this.prefixToReplace[this.provider];

        await this.providerInstance.put(destination, buffer, mimetype)

        const fileName = `${thePrefix}` + destination;
        console.log('DONE'+fileName)
        return {
            filename: fileName,
            path: destination,
            url: this.url(fileName),
        }
    }

    async move(origin:string, destination: string) {

        return  await this.providerInstance.move(origin, destination);
    }

    url(path: string) {
        const currentPath = path.replace(this.prefixToReplace[this.provider], `${this.domainURL}/`);

        return currentPath;
    }
    
}
