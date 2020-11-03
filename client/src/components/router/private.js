import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { User } from "context/user";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(User);
  return (
    <Route
      {...rest}
      render={(props) =>
        user === false ? <Redirect to="/auth" /> : <Component {...props} />
      }
    />
  );
};
export default PrivateRoute;
