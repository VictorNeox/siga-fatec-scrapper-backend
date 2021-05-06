import { Router } from 'express';
import { StudentsController } from './controllers/StudentsController';
import { TokenMiddleware } from './middlewares/TokenMiddleware';

const routes = Router();

const tokenMiddleware = new TokenMiddleware();


const studentsController = new StudentsController();

routes.get('/student/basicinfo', tokenMiddleware.checkToken, studentsController.basicInfo);
routes.get('/student/subjects', tokenMiddleware.checkToken, studentsController.subjects);
routes.get('/student/history', tokenMiddleware.checkToken, studentsController.history);
routes.get('/student/schedule', tokenMiddleware.checkToken, studentsController.schedule)
routes.get('/student/allinfo', tokenMiddleware.checkToken, studentsController.allInfo);

routes.post('/student/login', studentsController.login);


export { routes };