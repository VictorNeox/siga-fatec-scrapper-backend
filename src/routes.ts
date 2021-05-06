import { Router } from 'express';
import { StudentsController } from './controllers/StudentsController';

const routes = Router();

const studentsController = new StudentsController();

routes.post('/student/basicinfo', studentsController.basicInfo);
routes.get('/student/subjects', studentsController.subjects);

export { routes };