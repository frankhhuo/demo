import React from 'react'
import { Redirect , Route} from 'react-router-dom'


function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('username') !== 'undefined' && localStorage.getItem('token') && localStorage.getItem('token') !=='undefined';

    console.log("this", isAuthenticated);
    console.log(Component, {...restOfProps})
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? <Component/> : <Redirect to="/Auth" />
        }
      />
    );
  }

  

export default ProtectedRoute;