import axios from 'axios';

const sigaEndpoint = axios.create({
    baseURL: 'https://siga.cps.sp.gov.br/aluno',
});


export { sigaEndpoint }