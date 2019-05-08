import React, { Component } from 'react';
import fire from '../../fire.js';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts'



class Graph extends Component {


   constructor() {
    super();
    this.state = {
      products:[],
      topproducts: [],
      worstproducts: [],
      average_elo: [],
      num_wins: [],
      avg_elo: [],
      cur_data: [],
      axis: "elo_rating",
      optionsdata : [
         {key:0,value:'Top Ranked Products'},
         {key:1,value:'Worst Ranked Products'},
         {key:2,value:'Average Elo Rating by Brand'},
         {key:3,value:'Number of Wins by Brand'},

       ],


    }
  }



  componentDidMount() {
    let db = fire.firestore();
    db.collection('Beauty Products').get().then(snapshot => {
      snapshot.forEach(docSnapshot => {
     
        var toAdd = {name: docSnapshot.data().name, elo_rating:docSnapshot.data().elo_rating};

        if (this.state.avg_elo.length === 0 ) {
          this.setState({
            avg_elo: this.state.avg_elo.concat([{name: docSnapshot.data().brand, elo_rating: toAdd.elo_rating, count: 0}]),
            num_wins: this.state.num_wins.concat([{name: docSnapshot.data().brand, num_wins:docSnapshot.data().num_wins }])
          });
        }

        var xd = -1;

          for (var i = 0; i < this.state.avg_elo.length; i++) {
            console.log("sflksjdlfjsldfjsldfjs");

            // console.log();
            if (this.state.avg_elo[i].name !== undefined ) {
                          console.log(this.state.avg_elo[i]);
                          console.log(docSnapshot.data());

                      if (this.state.avg_elo[i].name.length === docSnapshot.data().brand.length) {
                          xd = i;
                          break;
                        }
                        else {
                          xd= -1;
                        }
            }
   


          }

            


        if (xd !== -1)  {
          this.state.avg_elo[xd].elo_rating += toAdd.elo_rating;
          this.state.avg_elo[xd].count ++;
          this.state.num_wins[xd].num_wins += docSnapshot.data().num_wins;
        }
        else {
          this.setState({
            avg_elo: this.state.avg_elo.concat([{name: docSnapshot.data().brand, elo_rating: toAdd.elo_rating, count: 0}]),
            num_wins: this.state.num_wins.concat([{name: docSnapshot.data().brand, num_wins:docSnapshot.data().num_wins }])

          });
        }


        this.setState({
          products: this.state.products.concat([toAdd])
        })
        var x = this.state.products.sort((a, b) => (a.elo_rating < b.elo_rating) ? 1 : -1);

        this.setState({
          topproducts: x.slice(0,4),
          worstproducts: x.reverse().slice(0,4),
          cur_data: x.slice(0,4),
        })



      })

          for (var i = 0; i < this.state.avg_elo.length; i ++) {
            this.setState ({
              average_elo: this.state.average_elo.concat ([{name: this.state.avg_elo[i].name, elo_rating: (this.state.avg_elo[i].elo_rating/ this.state.avg_elo[i].count)}])
            })

          }
          console.log(this.state.num_wins);

    })



  }





  handleChange = (e) => {
    // var value = this.state.optionsdata.filter(function(item) {
    //   return item.key == e.target.value
    // })


    if (e.target.value == 0) {
      this.setState({
        cur_data: this.state.topproducts,
        axis: "elo_rating"

      });
    }
    else if (e.target.value == 1) {
      this.setState({
        cur_data: this.state.worstproducts,
        axis: "elo_rating"

      });
    }

    else if (e.target.value == 2) {
      this.setState({
        cur_data: this.state.average_elo,
        axis: "elo_rating"

      });
      console.log(this.state.average_elo);

    }
    else if (e.target.value == 3) {
      this.setState({
        cur_data: this.state.num_wins,
        axis: "num_wins"
      });
      console.log(this.state.average_elo);

    }

  }


  render() {

    return (
    	<center>
    	<div style = {{margin: "auto"}}>  <br/> <br/>
    	  <select onChange={this.handleChange}>
        {this.state.optionsdata.map(function(data, key){  return (
          <option key={key} value={data.key}>{data.value}</option> )
        })}
      </select>

      <br />
      <br />
      <ResponsiveContainer  width="95%" height={400}>

      <BarChart
            width={500}
            height={300}
            data={this.state.cur_data}
            margin={{
              top: 1, right: 1, left: 1, bottom: 1,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={this.state.axis} fill="#8884d8" />
          </BarChart>
          </ResponsiveContainer>




			</div>
		</center>

    );
  }
}

export default Graph;
