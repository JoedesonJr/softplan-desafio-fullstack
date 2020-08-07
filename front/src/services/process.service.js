import ApiService from "./api.service";

export default class ProcessService extends ApiService {

    constructor() {
        super('/api/process');
    }

    saveProcess(process) {
        return this.post(process);
    }

    editProcess(process) {
        return this.post(process);
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

    findAllUsersFinishers() {
        return this.get('users/finishers');
    }

}
