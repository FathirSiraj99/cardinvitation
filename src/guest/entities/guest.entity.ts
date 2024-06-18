import { guest as guestModel } from "@prisma/client";

export class Guest implements guestModel {
    customersId: string;
    id: string;
    location: string;
    nama: string;
}
