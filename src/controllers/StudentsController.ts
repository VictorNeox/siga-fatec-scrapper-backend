import { Response, Request } from 'express';
import { StudentsService } from '../services/StudentsService';

class StudentsController {


    async login(request: Request, response: Response) {
        const credentials = request.body;

        const studentsService = new StudentsService();

        try {
            return response.json(await studentsService.login(credentials));
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async basicInfo(request: Request, response: Response) {

        const studentsService = new StudentsService();

        const { token } = request.headers;
        try {
            const studentData = await studentsService.basicInfo(token);

            return response.json(studentData);
        } catch (err) {
            response.status(400).json({ message: err.message });
        }
    }

    async subjects(request: Request, response: Response) {
        const { token } = request.headers;

        const studentsService = new StudentsService();

        try {
            const subjects = await studentsService.subjects(token);

            return response.json(subjects);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async history(request: Request, response: Response) {
        const { token } = request.headers;

        const studentsService = new StudentsService();

        try {
            const history = await studentsService.history(token);

            return response.json(history);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async allInfo(request: Request, response: Response) {

        const { token } = request.headers;

        const studentsService = new StudentsService();

        try {
            const studentsData = await studentsService.allData(token);
            return response.json(studentsData);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}

export { StudentsController };