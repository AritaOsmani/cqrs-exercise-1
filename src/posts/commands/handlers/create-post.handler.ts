import { ConflictException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreatedPostEvent } from "../../../posts/events/impl/created-post.event";
import { PostRepository } from "../../../posts/database/repositories/post.repository";
import { CreatePostCommand } from "../impl/create-post.command";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand>{
    constructor(
        private readonly postRepository: PostRepository,
        private readonly eventBus: EventBus
    ) { }

    async execute(command: CreatePostCommand): Promise<string> {
        try {
            const newPost = await this.postRepository.create(command)
            if (newPost) {
                this.eventBus.publish(new CreatedPostEvent(command.title, command.content, command.authorId))
                return 'Post created sucessfully!'
            }
        } catch (err) {
            throw new ConflictException('Something went wrong! The post was not created!')
        }
    }
}