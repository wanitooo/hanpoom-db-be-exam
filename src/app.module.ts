import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from './seeder/seeder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickingSlip } from './database/entities/picking.slip.entity';
import { PickingSlipItem } from './database/entities/picking.slip.item.entity';
import { PickingSlipDate } from './database/entities/picking.slip.date.entity';
import { PickingSlipModule } from './picking-slip/picking-slip.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DateTimeScalar } from './utils/date-scalar';
import { PickingSlipView } from './database/entities/picking-slip-view';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        entities: [
          PickingSlip,
          PickingSlipItem,
          PickingSlipDate,
          PickingSlipView,
        ],
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SeederModule,
    PickingSlipModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateTimeScalar],
})
export class AppModule {}
