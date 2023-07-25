import { join } from "path";
import { Bucket, StorageOptions, Storage as GCS } from "@google-cloud/storage";
import { ProviderStorage } from "./provider.abstract";

export class GoogleCloudStorage implements ProviderStorage<Bucket> {

    private _instance: Bucket = null;

    constructor(
        public storageOption: StorageOptions,
        public config: {
            bucketName: string,
            prefix: string
        }
    ) {
    
    }

    instance(): Bucket {
        if(this._instance == null) {
            this._instance = new GCS(this.storageOption).bucket(this.config.bucketName);
        }

        return this._instance;
    }

    async put(destination: string, buffer: Buffer, mimetype?: string) {
        console.log(`${this.config.prefix}/${destination}`)

        const file = this.instance().file(`${this.config.prefix}/${destination}`);

        await file.save(buffer, {
            gzip: true,
        })

        console.log("HHH")

        return true;

        // const writeStream = file.createWriteStream({
        //     gzip: true,
        //     resumable: false,
        // });

        // return new Promise((resolve, reject) => {
        //     writeStream.on('finish', () => {
        //         console.log('hhhh')
        //         resolve(true)
        //     }).on('error', (e) => {
        //         throw e;
        //         reject(false)
        //     })
        //     .on('pipe', () => {
        //         console.log('-------')
        //     })
        //     .end(buffer)
        // })

    }

    async move(origin:string, destination: string) {

        await this.instance().file(`${this.config.prefix}/${origin}`).move(`${this.config.prefix}/${destination}`);

        return destination;
    }

}