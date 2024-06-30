import { OmitType } from "@nestjs/mapped-types";
import { Auth } from "../entities/auth.entity";
import { isNotEmpty, isString } from "class-validator";

export class CreateAuthDto extends OmitType(Auth,['id']) {

    username: string;   
    password: string;
}
