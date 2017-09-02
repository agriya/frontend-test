import React, { Component } from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import authClient from './authClient';
import { StateList, StateShow } from './states';
import { GuestbookList, GuestbookCreate } from './guestbooks';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Admin authClient={authClient} restClient={jsonServerRestClient('')}>
        <Resource name="states" list={StateList} show={StateShow} />
        <Resource name="guestbooks" list={GuestbookList} create={GuestbookCreate} />
      </Admin>
    );
  }
}

export default App;
