import { account as accountModel } from "@prisma/client";

export class Auth implements accountModel {
    id: string;
    password: string;
    username: string;   
}
