import React from 'react';

import classes from './Navigation.module.css';
import contextStore from '../../store/context-store';
const Navigation = (props) => {
  return (
<contextStore.Consumer>
  {(cnx) => { return (<nav className={classes.nav}>
      <ul>
        {cnx.x && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {cnx.x && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {cnx.x && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>)
  }}
  
  </contextStore.Consumer>
  );
};

export default Navigation;
