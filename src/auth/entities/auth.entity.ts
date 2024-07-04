import { $Enums, account as accountModel } from "@prisma/client";

export class Auth implements accountModel {
    role: $Enums.Role;
    id: string;
    password: string;
    username: string;   
}
