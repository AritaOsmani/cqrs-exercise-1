import { ConflictException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { UpdatedUserevent } from "src/users/events/impl/updated-user.event";
import { UserRepository } from "../../../users/database/repositories/user.repository";
import { UpdateUserCommand } from "../impl/update-user.command";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus
    ) { }

    async execute(command: UpdateUserCommand): Promise<any> {
        const { userId, username, email, password } = command
        const updateFields = {
            username: command.username,
            email: command.email,
            password: command.password
        }
        if (username) {
            //check if the current username exists:
            const userFound = await this.userRepository.getByUsername(username)
            if (userFound) {
                throw new ConflictException('This username is already being used!')
            }
        }

        if (email) {
            //check if the current email exists:
            const userFound = await this.userRepository.getByEmail(email)
            if (userFound) {
                throw new ConflictException('This email is already being used!')
            }
        }

        try {
            await this.userRepository.update(userId, updateFields)
            this.eventBus.publish(new UpdatedUserevent(username, email))

        } catch (error) {
            throw new ConflictException('Something went wrong! User was not updated')
        }

    }
}