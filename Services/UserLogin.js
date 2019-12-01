import BASE_URL from '../URLs'

export default {
    async userLogin() {
        try {
                let response = await fetch(BASE_URL + '/api/login');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e);
        }
    }
};
