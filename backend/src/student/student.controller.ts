import { Controller, Post, UseInterceptors, UploadedFile, Body, UsePipes, ValidationPipe, Inject, Get } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"
import { RegistrationDto } from "./dto/registration.dto";
import { ConfigService } from "@nestjs/config";
import {  StorageEngine } from "multer";
import { CloudinaryStorage } from "@fluidjs/multer-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { StudentService } from "./student.service";

cloudinary.config({ 
    
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            }) 

const storage = new CloudinaryStorage({
    cloudinary, 
    params:{
        folder: process.env.CLOUDINARY_STORAGE_FOLDER,
    }
})

@Controller('registration')
export class StudentController {
    constructor(private readonly config:ConfigService, private readonly student: StudentService ){ 
    }
    @UseInterceptors(FileInterceptor("passportPhoto", {storage}))
    @Post()
    @UsePipes(ValidationPipe)
    async registerStudent( @Body() body:RegistrationDto, @UploadedFile() file: Express.Multer.File,){

        const { path:passportPhoto, filename:publicId } = file;

        await this.student.create({...body, passportPhoto, publicId})
        return{
            msg: "Registration successful",
            
        }

    }


    @Get()
    async getAllRegistrations() {
        return this.student.findAll();
    }
}