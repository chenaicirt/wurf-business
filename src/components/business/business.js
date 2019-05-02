import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import fire from '../../fire.js';
import {Table} from 'react-bootstrap';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts'


class Business extends Component {

     constructor() {
      super();
      this.state = {
        topproducts: [],
        worstproducts: [],
        prods: [],
        num_wins: 0,
        total_elo: 0,
        avg_elo: 0,
        total_prods: 0,

      }
    }

    componentDidMount() {
      let db = fire.firestore();
      db.collection('Beauty Products').get().then(snapshot => {
        snapshot.forEach(docSnapshot => {
          if (docSnapshot.data().brand == "dior") {


            this.setState({
              prods: this.state.prods.concat ([{name: docSnapshot.data().name, elo_rating: docSnapshot.data().elo_rating}]),
              num_wins: this.state.num_wins + docSnapshot.data().num_wins,
              total_prods: this.state.total_prods + 1,
              total_elo: this.state.total_elo + docSnapshot.data().elo_rating
            });

            var x = this.state.prods.sort((a, b) => (a.elo_rating < b.elo_rating) ? 1 : -1);

            this.setState({
              avg_elo:( (this.state.total_elo +docSnapshot.data().elo_rating)/this.state.total_prods),
              topproducts: x.slice(0,3),
              worstproducts: x.reverse().slice(0,3),

            });




          }

      })



    })

  }




  render() {
    return (
			<center>
			  <h1>Hello, Dior!</h1>
			  <p>
          Here are some helpful stats to get you going.
			  </p>

        <h2>Your Numbers</h2>
        <div style = {{width: "60%", margin: "auto"}}>

        <Table responsive hover>
     <thead>
       <tr>


       </tr>
     </thead>
     <tbody>
        <tr>
         <td></td>
         <td> total wins:</td>
         <td> {this.state.num_wins} </td>
       </tr>
       <tr>
         <td></td>
         <td> average elo:</td>
         <td>{this.state.avg_elo}</td>
       </tr>
       <tr>
         <td></td>
         <td>total products: </td>
         <td>{this.state.total_prods}</td>
       </tr>

     </tbody>
   </Table>
   </div>



        <h2>Underperforming Products</h2>
        <ResponsiveContainer  width="95%" height={400}>
        <BarChart
              width={500}
              height={300}
              data={this.state.worstproducts}
              margin={{
                top: 1, right: 1, left: 1, bottom: 1,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey= "elo_rating" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>

            <h2>Your Top Products</h2>

            <ResponsiveContainer  width="95%" height={500}>

            <BarChart
                  width={500}
                  height={300}
                  data={this.state.topproducts}
                  margin={{
                    top: 1, right: 1, left: 1, bottom: 1,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey= "elo_rating" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>




        </center>

    );
  }
}

export default Business;
