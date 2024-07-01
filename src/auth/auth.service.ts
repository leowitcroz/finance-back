import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'user';

    constructor(
        private readonly jwt: JwtService,
        private readonly prisma: PrismaService,
    ) { }

    createToken(user: user) {
        return {
            accessToken: this.jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                {
                    expiresIn: '7 days',
                    subject: String(user.id),
                    issuer: this.issuer,
                    audience: this.audience,
                },
            ),
        };
    }

    checkToken(token: string) {
        try {
            const data = this.jwt.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true
        } catch (e) {
            return false
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            }
        })

        if (!user) {
            throw new UnauthorizedException('Email e/ou senha incorretos.')
        }

        const token = this.createToken(user);

        const data = this.checkToken(token.accessToken)


        return {
            data,
            token
        }

    }

}
