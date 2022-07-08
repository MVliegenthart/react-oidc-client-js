import * as React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import UserAPI from '../api/UserApi';
import { Constants } from '../helpers/Constants';
import { ApiService } from '../services/ApiService';
import { AuthService } from '../services/AuthService';
import { RevService } from '../services/RevService';

import AuthContent from './AuthContent';
import Buttons from './Buttons';

export default class AppContent extends React.Component<any, any> {
  public authService: AuthService;
  public apiService: ApiService;
  public revService: RevService;
  private shouldCancel: boolean;

  constructor(props: any) {
    super(props);

    this.authService = new AuthService();
    this.apiService = new ApiService();
    this.revService = new RevService();
    this.state = { user: {}, api: {} };
    this.shouldCancel = false;
  }

  public componentDidMount() {
    this.getUser();
  }

  public login = () => {
    this.authService.login();
  };

  public callApi = () => {
    new UserAPI()
    .getProfile()
      .then(data => {
        this.setState({ api: data.data });
        toast.success('Api return successfully data, check in section - Api response');
      })
      .catch(error => {
        toast.error(error);
      });
  };

  public getSiteLogo = () => {
    this.apiService
      .getSiteImage()
      .then(data => {
        //this.setState({ api: data.data });
        toast.success('Api return successfully data, check in section - Api response');
      })
      .catch(error => {
        toast.error(error);
      });
  };

  public componentWillUnmount() {
    this.shouldCancel = true;
  }

  public renewToken = () => {
    this.authService
      .renewToken()
      .then(user => {
        toast.success('Token has been sucessfully renewed. :-)');
        this.getUser();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  public logout = () => {
    this.authService.logout();
  };

  public getUser = () => {
    this.authService.getUser().then(user => {
      if (user) {
        toast.success('User has been successfully loaded from store.');
      } else {
        toast.info('You are not logged in.');
      }

      if (!this.shouldCancel) {
        this.setState({ user });
      }
    });
  };

  public revAuth = () => {
    this.revService.revAuth().then(resp => {
      if (resp) {
        toast.success('User has been successfully authenticated in Revelation (' + Constants.revAuthUrl + '): ' + resp);
      }else{
        toast.info('No response from Revelation (' + Constants.revAuthUrl + ')');
      }
    }).catch(error => {
      toast.error(error);
    });
  };

  public render() {
    return (
      <>
        <ToastContainer />

        <Buttons
          login={this.login}
          logout={this.logout}
          renewToken={this.renewToken}
          getUser={this.getUser}
          callApi={this.callApi}
          getSiteLogo={this.getSiteLogo}
          revAuth={this.revAuth}
        />

        <AuthContent api={this.state.api} user={this.state.user} />
      </>
    );
  }
}
