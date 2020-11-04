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
          <Row>
            <MainMenu />
            <Col xs={24} sm={24} md={18} xl={19} xxl={20}>
              <div className="app-container">
                <Switch>
                  <Route exact path="/" component={Auth} />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/settings" component={Settings} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </Col>
          </Row>
        </div>
      </User.Provider>
    </Router>
  );
};
export default App;
