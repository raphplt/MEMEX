import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FeedModule } from "./feed/feed.module";
import { WikiModule } from "./wiki/wiki.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./cards/card.entity";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get<string>("DB_HOST"),
				port: configService.get<number>("DB_PORT"),
				username: configService.get<string>("DB_USERNAME"),
				password: configService.get<string>("DB_PASSWORD"),
				database: configService.get<string>("DB_NAME"),
				autoLoadEntities: true,
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([Card]),
		FeedModule,
		WikiModule,
	],
})
export class AppModule {}
