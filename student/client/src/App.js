import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header, PrivateRoute } from "components";
import { Auth, Home, Register, Settings } from "pages";
import { User } from "context/user";
import "antd/dist/antd.css";
import axios from "axios";
const App = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    axios
      .get("/api/auth")
      .then((response) => {
        if (response.data.msg) {
          setUser(false);
        } else {
          setUser(response.data.user);
        }
      })
      .catch(() => console.log("Please login"));
  }, []);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <Router>
      <User.Provider value={value}>
        <Header />
        <div className="app">
          <Switch>
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/" component={Home} />
            <Route exact path="/auth/register" component={Register} />
            <PrivateRoute path="/settings" component={Settings} />
            <Redirect to="/" />
          </Switch>
        </div>
      </User.Provider>
    </Router>
  );
};
export default App;
