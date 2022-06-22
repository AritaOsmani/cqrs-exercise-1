import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DeletedUserEvent } from "../impl/deleted-user.event";

@EventsHandler(DeletedUserEvent)
export class DeletedUserHandler implements IEventHandler<DeletedUserEvent>{
    handle(event: DeletedUserEvent) {
        console.log(`User with given id: ${event.userId} deleted sucessfully!`)
    }
}