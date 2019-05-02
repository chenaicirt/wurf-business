import React, { Component } from 'react';
import {Form, Button, Card} from 'react-bootstrap';


class Login extends Component {
  render() {
    return (
    	<div>
    	<br/>
	   <br />
	   <center>
	   <h2> Login </h2>
		 </center>
		 <br />
    	<Card style = {{width: "50%", margin: "auto", padding: "2em"}}>
				<Form>
				  <Form.Group controlId="formBasicEmail">
				    <Form.Label>Email address</Form.Label>
				    <Form.Control type="email" placeholder="Enter email" />
				    <Form.Text className="text-muted">
				      We'll never share your email with anyone else.
				    </Form.Text>
				  </Form.Group>

				  <Form.Group controlId="formBasicPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control type="password" placeholder="Password" />
				  </Form.Group>
				  <Form.Group controlId="formBasicChecbox">
				    <Form.Check type="checkbox" label="Check me out" />
				  </Form.Group>
				  <center>
				  <Button variant="primary" type="submit"  onClick={() => this.props.history.push('/business')}>
				    Submit
				  </Button>
				  </center>
				</Form>
			</Card>
			</div>
    );
  }
}

export default Login;
