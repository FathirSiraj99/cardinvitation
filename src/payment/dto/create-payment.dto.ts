import { OmitType } from '@nestjs/mapped-types';
import { Payment } from '../entities/payment.entity';

export class CreatePaymentDto extends OmitType(Payment, ['id']) {
  ordersId: string;
  paymentDate: Date;
  statusPayment: string;
}
