import { sigaEndpoint as api } from '../../axiosConfig';

class SessionInformation {
    async get() {
        const response = await api.get('/login.aspx');
        const cookie = await response.headers['set-cookie'][0];
        return await cookie.split(';')[0];
    }
}

export { SessionInformation };