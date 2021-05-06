import { sigaEndpoint as api } from '../../axiosConfig';

class Request {
    async getRouteData(route: string, token) {

        const headers = {
            Cookie: token,
        }
        const { data, status } = await api.get(route, { headers });

        if (status === 303) {
            throw new Error('Token expirado, realize o login novamente.');
        }

        return data;
    }
}

export { Request };