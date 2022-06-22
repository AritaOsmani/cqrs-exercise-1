import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./auth/jwt.strategy";
import { CommandHandlers } from "./commands/handlers";
import { User, UserSchema } from "./database/entities/user.entity";
import { UserRepository } from "./database/repositories/user.repository";
import { EventHandlers } from "./events/handlers";
import { QueryHandlers } from "./queries/handlers";
import { UserSagas } from "./sagas/users.sagas";
import { UserController } from "./user.controller";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: 3600
                    }
                }
            }
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CqrsModule,

    ],
    controllers: [UserController],
    providers: [
        UserRepository,
        JwtStrategy,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        UserSagas
    ],
    exports: [PassportModule, JwtStrategy, UserRepository]
})
export class UserModule { }