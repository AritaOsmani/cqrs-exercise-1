export class CreatedPostEvent {
    constructor(
        public readonly title: string,
        public readonly content: string,
        public readonly authorId: string
    ) { }
}