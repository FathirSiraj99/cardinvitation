import { orders as ordersModel } from "@prisma/client";

export class Order implements ordersModel{
    customersId: string;
    id: string;
    orderDate: Date;
}
