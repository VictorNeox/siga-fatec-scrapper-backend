import { SessionInformation } from '../utils/SessionInformation';
import { Parser } from '../utils/Parser';
import qs from 'querystring';
import { sigaEndpoint as api } from '../../axiosConfig';
import { Request } from './Request';

const GXState = JSON.stringify(require('../../gs.json'));

interface IUserLogin {
    user: string;
    password: string;
}

class Student {
    user: string;
    password: string;
    token: string;

    parser: Parser;

    request: Request;

    constructor() {
        this.parser = new Parser();
        this.request = new Request();
    }

    async login({ user, password }: IUserLogin): Promise<void> {
        const sessionInformation = new SessionInformation();
        const cookie = await sessionInformation.get()
        const headers = {
            Cookie: cookie,
        }

        const body = {
            vSIS_USUARIOID: user,
            vSIS_USUARIOSENHA: password,
            BTCONFIRMA: 'Confirmar',
            GXState,
        }

        const data = qs.stringify(body);

        const response = await api.post('/login.aspx', data, { headers });

        if (!await this.parser.parseLogin(response.data)) {
            throw new Error('Usuário ou senha incorretos.');
        }

        this.user = user;
        this.password = password;
        this.token = response.config.headers.Cookie;
    }

    async validateToken(token: string) {
        const headers = {
            Cookie: token,
        }
        const { status } = await api.get('/home.aspx', { headers });

        if (status === 303) {
            throw new Error('Token inválido.');
        }

        this.token = token;
        return true;
    }

    async getBasicInfo(): Promise<any> {

        const data = await this.request.getRouteData('/home.aspx', this.token);

        return await this.parser.parseBasicInfo(data);
    }

    async getSubjects(): Promise<any> {
        const data = await this.request.getRouteData('/notasparciais.aspx', this.token);

        return await this.parser.parseSubjects(data);
    }

    async getHistory(): Promise<any> {
        const data = await this.request.getRouteData('/historico.aspx', this.token);

        return await this.parser.parseHistory(data);
    }

    async getSchedule(): Promise<any> {
        const data = await this.request.getRouteData('/horario.aspx', this.token);

        return await this.parser.parseSchedule(data);
    }

    async getAllData(): Promise<any> {

        const basicInfo = await this.getBasicInfo();
        const subjects = await this.getSubjects();
        const history = await this.getHistory();
        const schedule = await this.getSchedule();

        const data = {
            basicInfo,
            subjects,
            history,
            schedule
        }

        return data;
    }
}

export { Student };