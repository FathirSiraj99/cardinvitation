import { OmitType } from "@nestjs/mapped-types";
import { Auth } from "../entities/auth.entity";

export class CreateAuthDto extends OmitType(Auth,['id']) {
    username: string;
    password: string;
}
