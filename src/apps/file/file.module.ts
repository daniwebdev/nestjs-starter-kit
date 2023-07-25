import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { StorageModule } from 'src/modules/storage/storage.module';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage()
    }),
    StorageModule,
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
