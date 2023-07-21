import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { jwtConstants } from "./constants";
import { UserService } from "../user/user.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            usernameField: 'email'
        })
    }

    async validate(payload: any) {
        const { sub: id } = payload;

        try {
            return await this.userService.findOne(id);
        } catch (err) {
            throw new ForbiddenException(err.message)
        }
    }
}