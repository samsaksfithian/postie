import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import API from '../API';
import UserList from './UserList';
import UserDetails from './UserDetails';

import '../css/Users.css';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount = async () => {
    const response = await API.getAllUsers();
    this.setState({ users: response.data });
  };

  render() {
    return (
      <div className="users container">
        <h2>Users</h2>
        <div className="columns">
          <UserList users={this.state.users} />
          <Route path="/users/:userId" component={UserDetails} />
        </div>
      </div>
    );
  }
}

export default Users;
