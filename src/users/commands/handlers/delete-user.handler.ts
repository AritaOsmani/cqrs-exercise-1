import { ConflictException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { DeletedUserEvent } from "src/users/events/impl/deleted-user.event";
import { UserRepository } from "../../../users/database/repositories/user.repository";
import { DeleteUserCommand } from "../impl/delete-user.command";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand>{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus
    ) { }

    async execute(command: DeleteUserCommand): Promise<any> {
        try {
            await this.userRepository.delete(command.userId)
            this.eventBus.publish(new DeletedUserEvent(command.userId))
        } catch (err) {
            throw new ConflictException('Something went wrong. User was not deleted!')
        }
    }
}