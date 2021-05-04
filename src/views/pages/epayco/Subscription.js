import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ButtonEpayco from "./ButtonEpayco";
import Epayco from "./Epayco";
import EpaycoSubscribe from "./EpaycoSubscribe";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/epayco">EPAYCO</Link>
            </li>
            <li>
              <Link to="/subscribe">SUBSCRIBE</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <ButtonEpayco />
          </Route>
          <Route path="/epayco">
            <Epayco />
          </Route>
          <Route exact path="/subscribe">
            <EpaycoSubscribe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
