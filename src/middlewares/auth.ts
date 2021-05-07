import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

interface IDecodedUser {
    username: String;
    password: String;
}

class TokenMiddleware {

    async verifyToken(request: Request, response: Response, next: NextFunction): Promise<any> {
        const authHeader = request.headers.authorization as String;

        if (!authHeader) {
            return response.status(401).json({ error: 'No token provided' });
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return response.status(401).json({ error: 'Token error' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return response.status(401).send({ error: 'Token malformatted' });
        }

        jwt.verify(token, authConfig.secret, (err: any, decoded: IDecodedUser) => {
            if (err) return response.status(401).json({ error: 'Invalid Token' });

            response.locals.credentials = {
                user: decoded.username,
                password: decoded.password,
            }
        });

        next();
    }
}

export { TokenMiddleware };