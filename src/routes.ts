import { Router } from 'express';
import { StudentsController } from './controllers/StudentsController';

const routes = Router();

const studentsController = new StudentsController();

routes.post('/student/basicinfo', studentsController.basicInfo);
routes.get('/student/subjects', studentsController.subjects);
routes.post('/student/allinfo', studentsController.allInfo);
routes.get('/student/history', studentsController.history);

export { routes };