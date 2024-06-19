import { OmitType } from "@nestjs/mapped-types";
import { Wedding } from "../entities/wedding.entity";

export class CreateWeddingDto extends OmitType(Wedding,['id']) {
    npp: string;
    npw: string;
    tgl_nikah: string;
    lokasi_koordinat: string;
    link_google_calender: string;
}
