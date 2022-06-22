export class DeletedUsersPostsEvent {
    constructor(
        public readonly authorId: string
    ) { }
}