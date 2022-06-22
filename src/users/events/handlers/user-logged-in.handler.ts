import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserLoggedInEvent } from "../impl/user-logged-in.event";

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInHandler implements IEventHandler<UserLoggedInEvent>{
    handle(event: UserLoggedInEvent) {
        console.log(`User ${event.usernameOrEmail} is currently logged in.`)
    }
}