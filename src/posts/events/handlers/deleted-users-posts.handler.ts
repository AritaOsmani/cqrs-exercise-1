import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DeletedUsersPostsEvent } from "../impl/deleted-users-posts.event";

@EventsHandler(DeletedUsersPostsEvent)
export class DeletedUsersPostsHandler implements IEventHandler<DeletedUsersPostsEvent>{
    handle(event: DeletedUsersPostsEvent) {
        console.log(`Posts of author with id: ${event.authorId} have  been successfully deleted!`)
    }
}