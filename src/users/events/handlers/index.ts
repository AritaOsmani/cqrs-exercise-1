
import { CreatedUserHandler } from "./created-user.handler";
import { DeletedUserHandler } from "./deleted-user.handler";
import { UpdatedUserHandler } from "./update-user.handler";
import { UserLoggedInHandler } from "./user-logged-in.handler";


export const EventHandlers = [CreatedUserHandler, UpdatedUserHandler, UserLoggedInHandler, DeletedUserHandler]