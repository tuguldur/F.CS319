import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header, PrivateRoute } from "components";
import { Auth, Settings, Dashboard } from "pages";
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
            <Route exact path="/" component={Auth} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/settings" component={Settings} />
            <Redirect to="/" />
          </Switch>
        </div>
      </User.Provider>
    </Router>
  );
};
export default App;
