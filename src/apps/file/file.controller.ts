import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UseJwtGuard } from 'src/common/filters/jwt.guard';
import { FileService } from './file.service';

@Controller('file')
@UseJwtGuard()
export class FileController {

    constructor(private fileService: FileService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Body('type') type: string,
        @Body('file_group') fileGroup: string,
        @Body('format') fileFormatGroup: string,
        @UploadedFile() file: Express.Multer.File,
    ) {


        let destination = `${fileFormatGroup}/${fileGroup}`;

        if(type == 'temporary') {
            destination = `tmp/${fileFormatGroup}/${fileGroup}`
        }

        return await this.fileService.upload(file, destination)


    }
}
