import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import * as path from "node:path";

import { configProvider } from "./app.config.provider";
import { FilmsController } from './films/films.controller';
import { OrdersController } from './orders/orders.controller';
import { FilmsService } from './films/films.service';
import { OrdersService } from './orders/orders.service';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot([
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/content/afisha/',
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    // @todo: Добавьте раздачу статических файлов из public
  ],
  controllers: [FilmsController, OrdersController, OrderController],
  providers: [configProvider, FilmsService, OrdersService, OrderService],
})
export class AppModule { }
