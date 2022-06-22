import { Body, Controller, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";
import { ValidateMongoId } from "../pipes/check-mongo-id.pipe";
import { CreatePostCommand } from "./commands/impl/create-post.command";
import { UpdatePostCommand } from "./commands/impl/update-post.command";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller('/posts')
export class PostsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @UseGuards(AuthGuard())
    @Post('/create')
    async createPost(@Body() createPostDto: CreatePostDto, @Req() req): Promise<string> {
        return await this.commandBus.execute(new CreatePostCommand(createPostDto.title, createPostDto.content, req.user._id))
    }

    @UseGuards(AuthGuard())
    @Patch('/update/:id')
    async updatePost(@Param('id', ValidateMongoId) id: string, @Body() updatePostDto: UpdatePostDto, @Req() req) {
        return await this.commandBus.execute(new UpdatePostCommand(req.user._id, id, updatePostDto.title, updatePostDto.content))
    }
}