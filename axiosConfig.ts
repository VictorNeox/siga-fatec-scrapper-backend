import axios from 'axios';

const sigaEndpoint = axios.create({
    baseURL: 'https://siga.cps.sp.gov.br/aluno',
    headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: 'https://siga.cps.sp.gov.br',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0',
    }
});


export { sigaEndpoint }