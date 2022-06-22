import { GetSingleUserHandler } from "./get-single-user.handler";
import { GetUsersHandler } from "./get-users.handler";
import { LogInUserHandler } from "./login-user.handler";

export const QueryHandlers = [GetUsersHandler, GetSingleUserHandler, LogInUserHandler]