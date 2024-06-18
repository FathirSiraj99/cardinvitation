import { OmitType } from "@nestjs/mapped-types";
import { Guest } from "../entities/guest.entity";

export class CreateGuestDto extends OmitType(Guest,['id']) {
    customersId: string;
    location: string;
    nama: string;
}
