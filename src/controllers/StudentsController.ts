import { Response, Request } from 'express';
import { SessionInformation } from '../utils/SessionInformation';

//import { sigaEndpoint as api } from '../../axiosConfig';

import { Parser } from '../utils/Parser';

import qs from 'querystring';
import axios from 'axios';

const GXState = JSON.stringify(require('../../gs.json'));

class StudentsController {

    async getBasicInfo(request: Request, response: Response) {
        const { user, password } = request.body;

        const sessionInformation = new SessionInformation();
        const parser = new Parser();

        const headers = {
            Connection: 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: await sessionInformation.get(),
            Origin: 'https://siga.cps.sp.gov.br',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0',
        }

        const body = {
            vSIS_USUARIOID: user,
            vSIS_USUARIOSENHA: password,
            BTCONFIRMA: 'Confirmar',
            GXState,
        }

        const url = 'https://siga.cps.sp.gov.br/aluno/login.aspx?467fcdffaf3c6a7d3797ca97bfff148f,,gx-no-cache=1620252094673';
        const data = qs.stringify(body);
        const sigaResponse = await axios({
            method: 'post',
            url,
            data,
            headers,
        });

        const studentData = await parser.parseBasicInfo(sigaResponse.data);

        return response.json(studentData);
    }
}

export { StudentsController };