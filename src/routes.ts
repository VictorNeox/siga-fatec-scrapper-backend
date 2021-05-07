import { Router } from 'express';
import { StudentsController } from './controllers/StudentsController';
import { TokenMiddleware } from './middlewares/auth';

const routes = Router();

const tokenMiddleware = new TokenMiddleware();


const studentsController = new StudentsController();

routes.get('/student/basicinfo', tokenMiddleware.verifyToken, studentsController.basicInfo);
routes.get('/student/subjects', tokenMiddleware.verifyToken, studentsController.subjects);
routes.get('/student/history', tokenMiddleware.verifyToken, studentsController.history);
routes.get('/student/schedule', tokenMiddleware.verifyToken, studentsController.schedule)
routes.get('/student/allinfo', tokenMiddleware.verifyToken, studentsController.allInfo);

routes.post('/student/login', studentsController.login);


export { routes };