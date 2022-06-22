import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatedPostEvent } from "../impl/created-post.event";

@EventsHandler(CreatedPostEvent)
export class CreatedPostHandler implements IEventHandler<CreatedPostEvent>{
    handle(event: CreatedPostEvent) {
        console.log('Post created sucessfully')
    }
}