import { ConflictException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { PostRepository } from "src/posts/database/repositories/post.repository";
import { DeletedUsersPostsEvent } from "src/posts/events/impl/deleted-users-posts.event";
import { DeleteUsersPostCommand } from "../impl/delete-users-post.command";

@CommandHandler(DeleteUsersPostCommand)
export class DeleteUsersPostHanlder implements ICommandHandler<DeleteUsersPostCommand>{
    constructor(
        private readonly postRepository: PostRepository,
        private readonly eventBus: EventBus
    ) { }
    async execute(command: DeleteUsersPostCommand): Promise<any> {
        try {
            await this.postRepository.deleteUsersPost(command.authorId)
            this.eventBus.publish(new DeletedUsersPostsEvent(command.authorId))
        } catch (err) {
            throw new ConflictException('Something went wrong.Posts were not deleted!')
        }
    }
}