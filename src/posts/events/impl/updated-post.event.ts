export class UpdatedPostEvent {
    constructor(
        public readonly title: string,
        public readonly content: string
    ) { }
}