import { Router } from 'express';
import { StudentsController } from './controllers/StudentsController';
import { TokenMiddleware } from './middlewares/TokenMiddleware';

const routes = Router();

const tokenMiddleware = new TokenMiddleware();


const studentsController = new StudentsController();

routes.get('/student/basicinfo', tokenMiddleware.checkToken, studentsController.basicInfo);
routes.get('/student/allinfo', studentsController.allInfo);
routes.get('/student/subjects', studentsController.subjects);
routes.get('/student/history', studentsController.history);

routes.post('/student/login', studentsController.login);


export { routes };