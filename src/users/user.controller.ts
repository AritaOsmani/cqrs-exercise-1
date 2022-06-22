import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";
import { ValidateMongoId } from "../pipes/check-mongo-id.pipe";
import { CreateUserCommand } from "./commands/impl/create-user.command";
import { DeleteUserCommand } from "./commands/impl/delete-user.command";
import { UpdateUserCommand } from "./commands/impl/update-user.command";
import { UserInterface } from "./database/entities/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import { GetUserDto } from "./dto/getUser.dto";
import { LogInDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { GetSingleUserQuery } from "./queries/impl/get-single-user.query";
import { GetUsersQuery } from "./queries/impl/get-users.query";
import { LoginUserQuery } from "./queries/impl/login-user.query";

@Controller('/user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post('/signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.commandBus.execute(new CreateUserCommand(createUserDto.username, createUserDto.email, createUserDto.password))
    }

    @UseGuards(AuthGuard())
    @Get('/all')
    async getAllUsers(): Promise<UserInterface[]> {
        return await this.queryBus.execute(new GetUsersQuery())
    }

    @Get('/:id')
    async getUserById(@Param('id', ValidateMongoId) id: string): Promise<GetUserDto> {
        return await this.queryBus.execute(new GetSingleUserQuery(id))
    }

    @Patch('/update/:userId')
    async updateUser(@Param('userId', ValidateMongoId) userId: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.commandBus.execute(new UpdateUserCommand(userId, updateUserDto.username, updateUserDto.email, updateUserDto.password))
    }

    @Post('/login')
    async logIn(@Body() loginDto: LogInDto): Promise<{ accessToken: string }> {
        return await this.queryBus.execute(new LoginUserQuery(loginDto.usernameOrEmail, loginDto.password))
    }

    @UseGuards(AuthGuard())
    @Delete('/delete')
    async deleteUser(@Req() req) {
        return await this.commandBus.execute(new DeleteUserCommand(req.user._id))
    }
}