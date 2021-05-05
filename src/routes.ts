import { Router } from 'express';
import { StudentsController } from './controllers/StudentsController';

const routes = Router();

const studentsController = new StudentsController();

routes.post('/student/basicinfo', studentsController.getBasicInfo);

export { routes };