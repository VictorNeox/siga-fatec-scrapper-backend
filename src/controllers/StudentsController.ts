import { Response, Request } from 'express';

class StudentsController {
    async getBasicInfo(request: Request, response: Response) {
        const { user, password } = request.body;
        return response.send('Funfou');
    }
}

export { StudentsController };