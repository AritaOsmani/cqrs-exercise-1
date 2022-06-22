import { IsNotEmpty, IsString } from "class-validator"

export class LogInDto {
    @IsNotEmpty()
    usernameOrEmail: string

    @IsString()
    @IsNotEmpty()
    password: string
}