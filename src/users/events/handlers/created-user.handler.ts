import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatedUserEvent } from "../impl/created-user.event";

@EventsHandler(CreatedUserEvent)
export class CreatedUserHandler implements IEventHandler<CreatedUserEvent>{
    handle(event: CreatedUserEvent) {
        console.log(`Welcome ${event.username}`)
    }
}