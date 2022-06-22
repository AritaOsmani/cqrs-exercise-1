import { CreatedPostHandler } from "./created-post.handler";
import { DeletedUsersPostsHandler } from "./deleted-users-posts.handler";
import { UpdatedPostHandler } from "./updated-post.handler";

export const EventHandlers = [CreatedPostHandler, UpdatedPostHandler, DeletedUsersPostsHandler]