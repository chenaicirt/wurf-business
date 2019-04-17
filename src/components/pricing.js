import React, { Component } from 'react';
import {Table} from 'react-bootstrap';


class Pricing extends Component {
  render() {
    return (
	   <div style = {{width: "60%", margin: "auto"}}>
	   <br />
	   <br />
	   <br />
	   <center>
	   <h2> Our Pricing Options </h2>
		 </center>
		 <br />
	   <Table responsive hover>
  <thead>
    <tr>
      <th></th>
      <th>Type</th>
      <th>Price</th>
     
    </tr>
  </thead>
  <tbody>
     <tr>
      <td></td>
      <td>Weekly</td>
      <td>$20.00</td>
    </tr>
    <tr>
      <td></td>
      <td>Monthly</td>
      <td>$30.00</td>
    </tr>
    <tr>
      <td></td>
      <td>Annual</td>
      <td>$300.00</td>
    </tr>

  </tbody>
</Table>
	   </div>

    );
  }
}

export default Pricing;
    


