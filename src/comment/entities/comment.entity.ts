import { comment as commentModel } from "@prisma/client";

export class Comment implements commentModel {
    attendace: boolean;
    customersId: string;
    guestId: string;
    id: string;
    message: string;
}
