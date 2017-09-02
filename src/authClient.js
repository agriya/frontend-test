import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import Cookies from 'js-cookie';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                Cookies.set('login', username);
            });
    }
    if (type === AUTH_CHECK) {
        return Cookies.get('login') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            Cookies.remove('login');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_LOGOUT) {
        Cookies.remove('login');
        return Promise.resolve();
    }
    return Promise.resolve();
}