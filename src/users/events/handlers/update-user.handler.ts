import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdatedUserevent } from "../impl/updated-user.event";

@EventsHandler(UpdatedUserevent)
export class UpdatedUserHandler implements IEventHandler<UpdatedUserevent>{

    handle(event: UpdatedUserevent) {
        console.log('User got updated!')
    }
}