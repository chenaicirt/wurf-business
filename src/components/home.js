import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
			<Jumbotron>
			<center>
			  <h1>Hello, Businesses!</h1>
			  <p>
			    Wurf is an application for users to choose and compare products. Wurf business will allow you to extract that data. 
			  </p>
			  <p>
			    <Button>Learn more</Button>
			  </p>
			 </center>
			</Jumbotron>
    );
  }
}

export default Home;
    


