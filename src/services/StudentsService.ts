import { SessionInformation } from '../utils/SessionInformation';
import { Parser } from '../utils/Parser';
import qs from 'querystring';
import { sigaEndpoint as api } from '../../axiosConfig';


const GXState = JSON.stringify(require('../../gs.json'));

interface IStudentData {
    user: string;
    password: string;
}

class StudentsService {
    async basicInfo({ user, password }: IStudentData) {
        const sessionInformation = new SessionInformation();
        const cookie = await sessionInformation.get()
        const parser = new Parser();
        const headers = {
            Connection: 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: cookie,
            Origin: 'https://siga.cps.sp.gov.br',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0',
        }

        const body = {
            vSIS_USUARIOID: user,
            vSIS_USUARIOSENHA: password,
            BTCONFIRMA: 'Confirmar',
            GXState,
        }

        const data = qs.stringify(body);

        const sigaResponse = await api.post('/login.aspx', data, { headers });

        const studentData = {
            basicInformation: await parser.parseBasicInfo(sigaResponse.data),
            token: sigaResponse.config.headers.Cookie
        }

        return studentData;
    }

    async subjects(sigaToken) {
        const sigaResponse = await api.get('/notasparciais.aspx', {
            headers: {
                cookie: sigaToken
            }
        });

        const parser = new Parser();

        return await parser.parseSubjects(sigaResponse.data);
    }

    async history(sigaToken) {
        const sigaResponse = await api.get('/historico.aspx', {
            headers: {
                cookie: sigaToken
            }
        });

        const parser = new Parser();

        return await parser.parseHistory(sigaResponse.data);
    }
}

export { StudentsService };