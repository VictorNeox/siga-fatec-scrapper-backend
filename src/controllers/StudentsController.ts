import { Response, Request } from 'express';
import { StudentsService } from '../services/StudentsService';

import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

interface IStudentCredentials {
    user: string;
    password: string;
}

function generateToken(credentials: IStudentCredentials) {
    return jwt.sign({ username: credentials.user, password: credentials.password }, authConfig.secret, {
        expiresIn: '365d',
    });
}

class StudentsController {

    async login(request: Request, response: Response): Promise<any> {
        const credentials = request.body;

        const studentsService = new StudentsService();

        if (!credentials.user || !credentials.password) {
            return response.status(400).json({ message: `You didn't provided the user or password` });
        }

        try {
            const { message } = await studentsService.login(credentials);
            return response.json({
                message,
                token: generateToken(credentials)
            });
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async basicInfo(request: Request, response: Response): Promise<any> {

        const studentsService = new StudentsService();

        const credentials = response.locals.credentials as IStudentCredentials;

        try {
            const { token } = await studentsService.login(credentials);
            const studentData = await studentsService.basicInfo(token);

            return response.json(studentData);
        } catch (err) {
            response.status(400).json({ message: err.message });
        }
    }

    async subjects(request: Request, response: Response): Promise<any> {
        const studentsService = new StudentsService()
            ;
        const credentials = response.locals.credentials as IStudentCredentials;

        try {
            const { token } = await studentsService.login(credentials);
            const subjects = await studentsService.subjects(token);

            return response.json(subjects);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async history(request: Request, response: Response): Promise<any> {
        const studentsService = new StudentsService();

        const credentials = response.locals.credentials as IStudentCredentials;

        try {
            const { token } = await studentsService.login(credentials);
            const history = await studentsService.history(token);

            return response.json(history);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async schedule(request: Request, response: Response): Promise<any> {
        const studentsService = new StudentsService();

        const credentials = response.locals.credentials as IStudentCredentials;

        try {
            const { token } = await studentsService.login(credentials);
            const schedule = await studentsService.schedule(token);

            return response.json(schedule);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }


    async allInfo(request: Request, response: Response): Promise<any> {

        const studentsService = new StudentsService();

        const credentials = response.locals.credentials as IStudentCredentials;

        try {
            const { token } = await studentsService.login(credentials);
            const studentsData = await studentsService.allData(token);
            return response.json(studentsData);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}

export { StudentsController };