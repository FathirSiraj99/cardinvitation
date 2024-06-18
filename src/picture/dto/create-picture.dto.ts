import { OmitType } from "@nestjs/mapped-types";
import { Picture } from "../entities/picture.entity";


export class CreatePictureDto extends OmitType(Picture,['id']){
    fileName: string;
    path: string;
    customersId: string;
}
