export class LoginUserQuery {
    constructor(
        public readonly usernameOrEmail: string,
        public readonly password: string
    ) { }
}