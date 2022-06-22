import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserInterface } from "../../../users/database/entities/user.entity";
import { UserRepository } from "../../../users/database/repositories/user.repository";
import { GetUsersQuery } from "../impl/get-users.query";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery>{
    constructor(
        private readonly repository: UserRepository
    ) { }

    async execute(query: GetUsersQuery): Promise<UserInterface[]> {
        const usersToReturn = []
        const users = await this.repository.getAllUsers()
        for (const user of users) {
            const newUser = {
                username: user.username,
                email: user.email
            }
            usersToReturn.push(newUser)
        }
        return usersToReturn
    }
}