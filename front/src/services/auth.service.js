import ApiService from "./api.service";

export const USER_TOKEN = "USER_TOKEN";
export const USER_LOGGED = "USER_LOGGED";

export default class AuthService extends ApiService {

    constructor() {
        super('/api/auth');
    }

    auth(user) {
        return this.post(user);
    }

    setAuthentication(user) {
        localStorage.setItem(USER_TOKEN, user.token);
        localStorage.setItem(USER_LOGGED, JSON.stringify(user));
        return this.redirect();
    }

    getLoggedUser() {
        let user = localStorage.getItem(USER_LOGGED);
        if (user) {
            user = JSON.parse(user);
            return user && user.id ? user : null;
        }
        return null
    }

    isAuthenticated() {
        return this.getLoggedUser() != null;
    }

    hasRole(role) {
        const user = this.getLoggedUser();
        return user.role === `ROLE_${role}`;
    }

    /* de acordo com a perm, decide pra onde mandar o user após autenticado */
    redirect() {
        const user = this.getLoggedUser();
        if (user) {
            switch (user.role) {
                case 'ROLE_ADMIN':    return '/users';
                case 'ROLE_TRIATOR':  return '/process';
                case 'ROLE_FINISHER': return '/process-opinion';
                default:
                    return '/';
            }
        }
        return '/'
    }

    logout() {
        localStorage.removeItem(USER_TOKEN);
        localStorage.removeItem(USER_LOGGED);
    }

}
