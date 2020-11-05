import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header, PrivateRoute, MainMenu } from "components";
import { Auth, Settings, Dashboard } from "pages";
import { Row, Col } from "antd";
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
          {user ? (
            <Row>
              <MainMenu />
              <Col xs={24} sm={24} md={18} xl={19} xxl={20}>
                <div className="app-container">
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                    <PrivateRoute exact path="/settings" component={Settings} />
                  </Switch>
                </div>
              </Col>
            </Row>
          ) : (
            <Switch>
              <Route exact path="/auth" component={Auth} />
              <Redirect to="/dashboard" />
            </Switch>
          )}
        </div>
      </User.Provider>
    </Router>
  );
};
export default App;
