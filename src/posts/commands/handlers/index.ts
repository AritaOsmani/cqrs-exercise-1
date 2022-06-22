import { CreatePostHandler } from "./create-post.handler";
import { DeleteUsersPostHanlder } from "./delete-users-post.handler";
import { UpdatePostHandler } from "./update-post.handler";

export const CommandHandlers = [CreatePostHandler, UpdatePostHandler, DeleteUsersPostHanlder]