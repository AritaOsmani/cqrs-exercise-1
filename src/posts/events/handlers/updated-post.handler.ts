import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdatedPostEvent } from "../impl/updated-post.event";

@EventsHandler(UpdatedPostEvent)
export class UpdatedPostHandler implements IEventHandler<UpdatedPostEvent>{
    handle(event: UpdatedPostEvent) {
        console.log('Post was updated successfully!')
    }
}