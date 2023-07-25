import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StorageService } from 'src/modules/storage/storage.service';
import { Response } from 'src/utils';
// import { Response } from 'src/utils/response';
// import { storage } from 'src/utils/storage/storage';

@Injectable()
export class FileService {

    constructor(
        private storageService: StorageService,
    ) {

    }


    async upload(file: Express.Multer.File, destination: string) {

        if(file == undefined) throw new HttpException("File undefined", HttpStatus.BAD_REQUEST);

        const path = destination + file.originalname;

        this.storageService.setProvider('gcs');
        
        const output = await this.storageService.put(path, file.buffer);
        return output;
        return Response.success({
            message: "Upload successfull",
            data: output
        });
    }
}
