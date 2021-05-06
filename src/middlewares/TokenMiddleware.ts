import { Request, Response, NextFunction } from "express";

class TokenMiddleware {

    async checkToken(request: Request, response: Response, next: NextFunction): Promise<any> {
        if (!request.headers.token) {
            return response.status(404).json({ message: 'No token provided' });
        }

        next();
    }
}

export { TokenMiddleware };