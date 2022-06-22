export class CreatedUserEvent{
    constructor(
        public readonly username:string,
        public readonly email:string
    ){}
}