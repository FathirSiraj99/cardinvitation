import { customers as customersModel } from "@prisma/client";

export class Customer implements customersModel {
    contact: string;
    email: string;
    id: string;
    name: string;
    accountId: string;
}
