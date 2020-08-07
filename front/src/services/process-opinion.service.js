import ApiService from "./api.service";

export default class ProcessOpinionService extends ApiService {

    constructor() {
        super('/api/process-opinion');
    }

    saveProcessOpinion(opinion) {
        return this.post(opinion);
    }

    findAllProcessOpinionToUser() {
        return this.get();
    }

}
