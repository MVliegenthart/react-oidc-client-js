
import RevelationAPIBase from "./RevelationAPIBase";

export default class UserAPI extends RevelationAPIBase {


    //Gets the user's profile from the user API
    public getProfile() {
        return this.callApi('user/profile');
    };
}