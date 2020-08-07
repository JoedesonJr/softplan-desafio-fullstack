import ApiService from "./api.service";

export default class UserService extends ApiService {

    constructor() {
        super('/api/users');
    }

    saveUser(user) {
        return this.post(user);
    }

    editUser(user) {
        return this.post(user);
    }

    deleteById(id) {
        return this.delete(id);
    }

    findAll() {
        return this.get();
    }

    findById(id) {
        return this.get(`${id}`);
    }

}
