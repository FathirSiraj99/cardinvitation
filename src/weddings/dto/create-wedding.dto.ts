import { OmitType } from "@nestjs/mapped-types";
import { Wedding } from "../entities/wedding.entity";

export class CreateWeddingDto extends OmitType(Wedding,['id']) {
    customersId: string;
    npp: string;
    npw: string;
    tgl_nikah: string;
    lokasi_koordinat: string;
    link_google_calender: string;
    waktu_pernikahan: string;
    nama_orang_tua_ayah: string;
    nama_orang_tua_ibu: string;
    tempat_pernikahan: string;
}
