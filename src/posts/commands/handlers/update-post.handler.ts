import { ConflictException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { PostRepository } from "src/posts/database/repositories/post.repository";
import { UpdatedPostEvent } from "src/posts/events/impl/updated-post.event";
import { UpdatePostCommand } from "../impl/update-post.command";

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand>{
    constructor(
        private readonly postRepository: PostRepository,
        private readonly eventBus: EventBus
    ) { }

    async execute(command: UpdatePostCommand): Promise<any> {

        const fieldsToUpdate = {
            title: command.title,
            content: command.content
        }

        //find the post with given id:
        const postFound = await this.postRepository.getPostById(command.postId)
        if (postFound) {
            //check if the author with the given id is the posts'author:
            if (postFound.authorId.toString() === command.authorId.toString()) {
                await this.postRepository.update(command.postId, fieldsToUpdate)
                this.eventBus.publish(new UpdatedPostEvent(command.title, command.content))
            } else {
                throw new UnauthorizedException('You are not authorized to update this post!')
            }
        } else {
            throw new NotFoundException('Post with given id not found!')
        }


    }
}