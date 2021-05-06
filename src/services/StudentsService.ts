import { SessionInformation } from '../utils/SessionInformation';
import { Parser } from '../utils/Parser';
import qs from 'querystring';
import { sigaEndpoint as api } from '../../axiosConfig';
import { Student } from '../models/Student';


const GXState = JSON.stringify(require('../../gs.json'));

interface IStudentCredentials {
    user: string;
    password: string;
}

class StudentsService {

    async login(userData: IStudentCredentials) {
        const student = new Student();

        await student.login(userData);

        return { token: student.token, message: 'Login efetuado com sucesso!' };
    }

    async basicInfo(token) {

        const student = new Student();

        await student.validateToken(token);

        return await student.getBasicInfo();
    }

    async subjects(token) {
        const student = new Student();

        await student.validateToken(token);

        return await student.getSubjects();
    }

    async history(token) {
        const student = new Student();

        await student.validateToken(token);

        return await student.getHistory();
    }

    async allData(token) {
        const student = new Student();

        await student.validateToken(token);

        return await student.getAllData();
    }
}

export { StudentsService };