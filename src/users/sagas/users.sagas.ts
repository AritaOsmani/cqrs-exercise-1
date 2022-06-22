import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { delay, map, Observable } from "rxjs";
import { DeleteUsersPostCommand } from "src/posts/commands/impl/delete-users-post.command";
import { DeletedUserEvent } from "../events/impl/deleted-user.event";

@Injectable()
export class UserSagas {
    @Saga()
    userDeleted = (events$: Observable<any>): Observable<ICommand> => {
        return events$
            .pipe(
                ofType(DeletedUserEvent),
                delay(500),
                map(event => {
                    return new DeleteUsersPostCommand(event.userId)
                })
            )
    }
}