import axios from "axios";
import { Constants } from "../helpers/Constants";
import { AuthService } from "./AuthService";

export class RevService {

    private authService: AuthService;

  constructor() {
    //Only required for cross-domain cookies which we are not doing right now.
    //axios.defaults.withCredentials = true;
    this.authService = new AuthService();
  }
  
    public async revAuth(){
        const user = await this.authService.getUser();
        if (user && user.access_token) {
            const headers = {
                Accept: 'application/json',
                Authorization: 'Bearer ' + user.access_token
            };
            return axios.get(Constants.revAuthUrl, { headers }).catch(error => {
                if (error.response.status === 400) {
                    return this.authService.renewToken().then(renewedUser => {
                        return axios.get(Constants.revAuthUrl, { headers });
                    });
                }
                throw error;
            });
        }
    }
}