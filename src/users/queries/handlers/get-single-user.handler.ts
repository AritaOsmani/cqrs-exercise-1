import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserDto } from "src/users/dto/getUser.dto";
import { UserRepository } from "../../../users/database/repositories/user.repository";
import { GetSingleUserQuery } from "../impl/get-single-user.query";

@QueryHandler(GetSingleUserQuery)
export class GetSingleUserHandler implements IQueryHandler<GetSingleUserQuery>{
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(query: GetSingleUserQuery): Promise<GetUserDto> {
        const user = await this.userRepository.getUserById(query.userId)
        const userToReturn = {
            username: user.username,
            email: user.email
        }
        return userToReturn
    }
}