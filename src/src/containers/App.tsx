import * as React from 'react';
import AppRouter from '../components/AppRouter';

import Header from '../components/Header';
import Nav from '../components/Nav';
import logo from '../logo.svg';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header pageTitle="Welcome to Revelation helpdesk project Namibia!" logoSrc={logo} />
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <div className="col">              
              <AppRouter />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
