import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { City } from './modules/cities/entities/city.entity';
import { BrokerOffice } from './modules/brokers/entities/broker-office.entity';
import { Lead } from './modules/leads/entities/lead.entity';
import { CitiesModule } from './modules/cities/cities.module';
import { BrokersModule } from './modules/brokers/brokers.module';
import { LeadsModule } from './modules/leads/leads.module';
import { HealthController } from './health.controller';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'plyo_user',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'plyo_leads',
      synchronize: false,
      autoLoadEntities: true,
      entities: [City, BrokerOffice, Lead],
    }),
    CitiesModule,
    BrokersModule,
    LeadsModule,
    NotificationsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
