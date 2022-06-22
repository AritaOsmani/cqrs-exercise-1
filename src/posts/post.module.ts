import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/users/user.module";
import { CommandHandlers } from "./commands/handlers";
import { UserPost, UserPostSchema } from "./database/entities/post.entity";
import { PostRepository } from "./database/repositories/post.repository";
import { EventHandlers } from "./events/handlers";
import { PostsController } from "./post.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: UserPost.name, schema: UserPostSchema }]), CqrsModule, UserModule],
    controllers: [PostsController],
    providers: [
        PostRepository,
        ...CommandHandlers,
        ...EventHandlers
    ]
})
export class PostModule { }