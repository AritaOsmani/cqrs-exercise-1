import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../database/repositories/user.repository";
import { JwtPayloadInterface } from "../interfaces/jwtPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository, private configService: ConfigService) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayloadInterface) {
        const { usernameOrEmail } = payload
        //check if logged by username:
        const userFound = await this.userRepository.getByUsername(usernameOrEmail)
        if (userFound) {
            return userFound
        } else {
            //check if logged by email:
            const userFound = await this.userRepository.getByEmail(usernameOrEmail)
            if (userFound) {
                return userFound
            } else {
                throw new NotFoundException('User not found!')
            }
        }
    }
}