import React from 'react';
import '../css/UserDetails.css';

const UserDetails = props => {
  const { user } = props.location.state;
  return (
    <div className="user-details">
      <h3>{user.username}</h3>
      <p>
        <span className="label">Name:</span> {user.name}
      </p>
      <p>
        <span className="label">Email:</span> {user.email}
      </p>
      <p>
        <span className="label">Website:</span>{' '}
        <a href={`https://${user.website}`}>{user.website}</a>
      </p>
    </div>
  );
};

export default UserDetails;
