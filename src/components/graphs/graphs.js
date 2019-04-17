import React, { Component } from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import topprod from '../../img/topproducts.png'
import prods from '../../img/yourproducts.png'
import trends from '../../img/trends.png'



class Graph extends Component {
   constructor() {
    super(); 
    this.state = {
      optionsdata : [
         {key:0,value:'Top Ranked Products'},
         {key:1,value:'Notable Trends'},
         {key:2,value:'Your Products'},
       ],
      currentimage: null,
      randomImages : [
        topprod, trends, prods]

    }
  }

  handleChange = (e) => {
    var value = this.state.optionsdata.filter(function(item) {
      return item.key == e.target.value
    }) 

    this.setState({currentimage: this.state.randomImages[e.target.value]}, function () {
      console.log(this.state.currentimage);
    });
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

        <img src={this.state.currentimage} height = "300"/>
			</div>
		</center>

    );
  }
}

export default Graph;
