import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { async } from 'rxjs';
import { PostModule } from './posts/post.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({

      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DB_URI"),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }),
    UserModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
