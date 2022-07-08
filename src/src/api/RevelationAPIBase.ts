import axios from "axios";
import { Constants } from "../helpers/Constants";
import { AuthService } from "../services/AuthService";


//Represents the base class for Revelation API calls 
export default class RevelationAPIBase {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  protected callApi(path: string): Promise<any> {
    return this.authService.getUser().then(user => {
      console.log('API got user: ',path);
      if (user && user.access_token) {
        return this._callApi(path,user.access_token).catch(error => {
          if (error.response.status === 401) {
            this.authService.renewToken().then(renewedUser => {
              return this._callApi(path,renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        this.authService.renewToken().then(renewedUser => {
          return this._callApi(path,renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  protected _callApi(path:string,token: string) {
    console.log('Calling API: ',path);
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    };

    return axios.get(Constants.apiRoot + path, { headers });
  }
}