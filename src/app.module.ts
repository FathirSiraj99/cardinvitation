import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { GuestModule } from './guest/guest.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { PictureModule } from './picture/picture.module';
import { WeddingsModule } from './weddings/weddings.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './auth/guard/roles.guard';

@Module({
  imports: [
    CustomersModule,
    OrdersModule,
    PaymentModule,
    GuestModule,
    CommentModule,
    AuthModule,
    PictureModule,
    WeddingsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
