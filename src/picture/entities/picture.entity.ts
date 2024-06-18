import { picture as pictureModel } from "@prisma/client";

export class Picture implements pictureModel  {
    customersId: string;
    fileName: string;
    id: string;
    path: string;
}
