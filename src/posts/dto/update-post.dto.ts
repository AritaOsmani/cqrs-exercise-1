import { IsOptional, IsString } from "class-validator"

export class UpdatePostDto {

    @IsString()
    @IsOptional()
    readonly title?: string

    @IsString()
    @IsOptional()
    readonly content?: string
}