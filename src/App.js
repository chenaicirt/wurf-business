import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar.js"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from "./components/login.js"
import Pricing from "./components/pricing.js"
import Features from "./components/features.js"
import Home from "./components/home.js"
import Graph from "./components/graphs/graphs.js"
import Business from "./components/business/business.js"

import wurflogo from './img/wurf-logo.png'

class App extends Component {
  render() {
    return (
      <Router>

          <div>
          <center>
           <Link to={'/home'}>
            <img src={wurflogo} alt="Wurf" height="80" />
            </Link>
          </center>


           <Navbar />

           </div>

         <Switch>
              <Route exact path= "/login" component={Login}/>
              <Route path="/pricing" component={Pricing}/>
              <Route path="/features" component={Features}/>
              <Route path="/data" component={Graph}/>
              <Route path="/business" component={Business}/>

              <Route path="/" component={Home}/>
          </Switch>


          <div className="content"> </div>
            <div className="footer"> <br />
              <p> &copy; Wurf Team</p>

        </div>

        </Router>



    );
  }
}

export default App;
