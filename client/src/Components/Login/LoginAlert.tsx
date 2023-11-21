import React from 'react';
import '../../Styles/LoginAlert.css';

const LoginAlert = () => {
  return (
    <div className="LoginAlert">
      <h1>
        Please <a href="/login">log in</a> to use this feature
      </h1>
    </div>
  );
};

export default LoginAlert;
