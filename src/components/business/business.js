import React, { Component } from 'react';
import fire from '../../fire.js';
import {Table} from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, LineChart, Line
} from 'recharts'


class Business extends Component {

     constructor() {
      super();
      this.state = {
        topproducts: [],
        worstproducts: [],
        prods: [],
        lolprods: [],
        num_wins: 0,
        total_elo: 0,
        avg_elo: 0,
        total_prods: 0,
        data : [
  {
    name: 'T1', elo_rating: 1400,
  },
  {
    name: 'T2', elo_rating: 1800,
  },
  {
    name: 'T3', elo_rating: 2300,
  },
  {
    name: 'T4', elo_rating: 2000,
  },
  {
    name: 'T5', elo_rating: 2181,
  },
  {
    name: 'T6', elo_rating: 2500,
  },
  {
    name: 'T7', elo_rating: 1800,
  },
]


      }
    }


    componentDidMount() {
      let db = fire.firestore();
      db.collection('Beauty Products').get().then(snapshot => {
        snapshot.forEach(docSnapshot => {
          if (docSnapshot.data().brand === "dior") {


            this.setState({
              prods: this.state.prods.concat ([{name: docSnapshot.data().name, elo_rating: docSnapshot.data().elo_rating}]),
              lolprods: this.state.lolprods.concat ([{name: docSnapshot.data().name, losses: docSnapshot.data().num_losses, num_wins: docSnapshot.data().num_wins }]),
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

            console.log(this.state.lolprods);




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

   <h2>Average Elo_rating Over Time </h2>
   <ResponsiveContainer  width="95%" height={400}>
   <LineChart
      width={500}
      height={300}
      data={this.state.data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="elo_rating" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>

       </ResponsiveContainer>


   <h2>All Products</h2>
   <ResponsiveContainer  width="95%" height={400}>
   <LineChart
      width={500}
      height={300}
      data={this.state.lolprods}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="losses" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="num_wins" stroke="#82ca9d" />
    </LineChart>

       </ResponsiveContainer>


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
