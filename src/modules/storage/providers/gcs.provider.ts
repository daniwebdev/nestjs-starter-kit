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
            this._instance = new GCS(this.storageOption).bucket('tradeapp-f8e74.appspot.com');
        }

        return this._instance;
    }

    async put(destination: string, buffer: Buffer, mimetype?: string) {

        const file = this.instance().file(destination);

        await file.save(buffer, {
            gzip: true,
        });

        return file;
    }

    async move(origin:string, destination: string) {
        console.log(`${this.config.prefix}/${origin}`)
        console.log(`${this.config.prefix}/${destination}`)

        await this.instance().file(`${this.config.prefix}/${origin}`).move(`${this.config.prefix}/${destination}`);

        return destination;
    }

}