import { OmitType } from "@nestjs/mapped-types";
import { Comment } from "../entities/comment.entity";

export class CreateCommentDto extends OmitType(Comment,['id']) {
    message: string;
    customersId: string;
    attendace: boolean;
    guestId: string;
}
