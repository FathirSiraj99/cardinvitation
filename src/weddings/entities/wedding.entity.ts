import { wedings as weddingModul } from '@prisma/client';
export class Wedding implements weddingModul {
  nama_orang_tua_ibu: string;
  tempat_pernikahan: string;
  waktu_pernikahan: string;
  digital_gift: string;
  nama_orang_tua_ayah: string;
  customerId: string;
  id: number;
  link_google_calender: string;
  lokasi_koordinat: string;
  npp: string;
  npw: string;
  tgl_nikah: string;
}
