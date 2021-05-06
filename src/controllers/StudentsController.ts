import { Response, Request } from 'express';
import { SessionInformation } from '../utils/SessionInformation';

import { sigaEndpoint as api } from '../../axiosConfig';

import { Parser } from '../utils/Parser';

import qs from 'querystring';
import axios from 'axios';

const GXState = JSON.stringify(require('../../gs.json'));

class StudentsController {

    async basicInfo(request: Request, response: Response) {
        const { user, password } = request.body;

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

        return response.json(studentData);
    }

    async subjects(request: Request, response: Response) {
        const { sigatoken } = request.headers;

        const sigaResponse = await api.get('/notasparciais.aspx', {
            headers: {
                cookie: sigatoken
            }
        });

        const parser = new Parser();

        await parser.parseSubjects(sigaResponse.data);


        return response.send(sigaResponse.data)
    }
}

export { StudentsController };