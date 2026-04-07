import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {UserService} from './user/user.service';
import {JwtPayload} from './dto/jwt-payload.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config: ConfigService,
        private userService: UserService,
    ) {
        const jwtSecret = config.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findById(payload.sub, true); // payload.sub is el id del usuario
        if (!user) return new NotFoundException('User not found');
        return user;
    }
}
