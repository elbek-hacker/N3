import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { existsSync, mkdirSync, writeFile } from "fs";
import { join } from "path";
import { envConfig } from "src/config";

@Injectable()
export class FileService {
    private filePath = join(process.cwd(), '..', envConfig.FILE_PATH);

    async create (file: Express.Multer.File): Promise<string>{
        try {
            const fileName = `${Date.now()}_${file.originalname}`;
            if(!existsSync(this.filePath)){
                mkdirSync(this.filePath, {recursive: true});
            }
            await new Promise<void>((res, rej) => {
                writeFile(join(this.filePath, fileName), file.buffer, (err: any)=>{
                    if(err) rej(err);
                    res();
                })
            });
            return `${envConfig.BASE_URL}/${fileName}`
        } catch (error) {
            throw new InternalServerErrorException(
                `Error on uploading file: ${error}`
            );
        }
    }
}