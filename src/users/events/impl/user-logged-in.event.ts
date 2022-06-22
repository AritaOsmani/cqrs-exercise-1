export class UserLoggedInEvent {
    constructor(
        public readonly usernameOrEmail: string
    ) { }
}