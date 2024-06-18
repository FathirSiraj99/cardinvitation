import { OmitType } from "@nestjs/mapped-types";
import { Customer } from "../entities/customer.entity";

export class CreateCustomerDto extends OmitType(Customer,['id']) {
    contact: string;
    email: string;
    name: string;
}
