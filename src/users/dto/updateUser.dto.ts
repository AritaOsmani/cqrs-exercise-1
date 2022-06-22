import { IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {

    @IsString()
    @IsOptional()
    readonly username?: string

    @IsEmail()
    @IsOptional()
    readonly email?: string

    @IsString()
    @IsOptional()
    readonly password?: string
}