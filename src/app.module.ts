import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AuthModule } from './modules/auth/auth.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';

import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),

    AuthModule,
    RestaurantModule,
    CartModule,
    OrderModule,
    PaymentModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}