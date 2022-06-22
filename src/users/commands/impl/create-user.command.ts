export class CreateUserCommand {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public password: string
    ) { }
}