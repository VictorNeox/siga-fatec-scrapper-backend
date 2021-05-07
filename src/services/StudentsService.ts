import { Student } from '../models/Student';


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

    async schedule(token) {
        const student = new Student();

        await student.validateToken(token);

        return await student.getSchedule();
    }

    async allData(token) {
        const student = new Student();

        await student.validateToken(token);

        return await student.getAllData();
    }
}

export { StudentsService };