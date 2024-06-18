import { payment as paymentModel } from "@prisma/client";

export class Payment implements paymentModel {
    id: string;
    ordersId: string;
    paymentDate: Date;
    statusPayment: string;
}
