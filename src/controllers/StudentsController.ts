import { Response, Request } from 'express';

import { StudentsService } from '../services/StudentsService';

class StudentsController {

    async basicInfo(request: Request, response: Response) {

        const studentsService = new StudentsService();

        try {
            const studentData = await studentsService.basicInfo(request.body);

            return response.json(studentData);
        } catch (err) {
            response.status(400).json({ message: err.message });
        }
    }

    async subjects(request: Request, response: Response) {
        const { sigatoken } = request.headers;

        const studentsService = new StudentsService();

        try {
            const subjects = await studentsService.subjects(sigatoken);

            return response.send(subjects);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async history(request: Request, response: Response) {
        const { sigatoken } = request.headers;

        const studentsService = new StudentsService();

        try {
            const history = await studentsService.history(sigatoken);

            return response.json(history);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }

    async allInfo(request: Request, response: Response) {

        try {
            const { sigatoken } = request.headers;

            const studentsService = new StudentsService();

            const basicInfo = await studentsService.basicInfo(request.body);

            const subjects = await studentsService.subjects(sigatoken);

            const history = await studentsService.history(sigatoken);

            const studentsData = {
                basicInfo: basicInfo.basicInformation,
                subjects,
                history
            }

            return response.json(studentsData);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}

export { StudentsController };