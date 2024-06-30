import { wedings as weddingModul } from "@prisma/client";
export class Wedding implements weddingModul {

    customersId: string;
    id: number;
    link_google_calender: string;
    lokasi_koordinat: string;
    npp: string;
    npw: string;
    tgl_nikah: string;
}
