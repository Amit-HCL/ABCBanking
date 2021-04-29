import React from "react"
import Home from "./Home"
import Login from "./Login"
import CreateAccount from "./CreateAccount"
import Transactions from "./Transactions"
import Funds from "./Funds"
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Admin from "./Admin"

function Routes() {
  return (
    <Router>
        <Switch>
               {
                 localStorage.getItem('isLoggedIn') == 'true'? (localStorage.getItem('isAdmin')=='true'? <Route exact path="/" component={Admin} />:<Route exact path="/" component={Home} />) : <Route exact path="/" component={Login}/>
               }
               {
                 localStorage.getItem('isLoggedIn') == 'true'? (localStorage.getItem('isAdmin')=='true'?<Route exact path="/transactions" component={Admin} />: <Route exact path="/transactions" component={Transactions} /> )  : <Route exact path="/transactions" component={Login}/>
               }
                {
                 localStorage.getItem('isLoggedIn') == 'true'? (localStorage.getItem('isAdmin')=='true'? <Route exact path="/funds" component={Admin} />: <Route exact path="/funds" component={Funds} />) : <Route exact path="/funds" component={Login}/>
               }
               {/* <Route exact path="/" component={Home} /> */}
               <Route exact path="/createAccount" component={CreateAccount}/>
         </Switch>
    </Router>
  );
}

export default Routes;