import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentIds:[],
      data:[{id:0,name:"",image:""}]
    };
    this.api = "https://pokeapi.co/api/v2/pokemon/";

  } 

  fetchData(ids = [1, 2, 3]) {
      var promises = []; 
      ids.forEach(id => {
        this.state.data[id] ||
        promises.push(fetch(this.api + id)
            .then(val => val.json())
            .then(val => {
             var dataTemp = this.state.data; 
              dataTemp[id] = {
                id: id,
                name: val.name,
                image: val.sprites.front_default
              };
              this.setState({data:dataTemp});
            })
        );
      });
      Promise.all(promises).then(()=>{
            this.setState( {currentIds:ids} );
      });
    }
  componentDidMount(){
    this.fetchData();
  }
  render() {
    return (
      <div className="App">
        {
          this.state.currentIds.map((d,id) => {
            return (
              <div key={id} className="holder">
                <div className="header">
                  <span style={{"float":"left"}}> {this.state.data[d].name}</span> 
                 <span  style={{"float":"right"}}> ID: {d} </span>
                </div>
                <div className="imgHolder">
                  <img
                    alt={this.state.data[d].name}
                    className="img"
                    src={this.state.data[d].image}
                  />
                </div>
              </div>
            );
          })
        }
        <div>
          <button className="prev" onClick={()=>this.state.currentIds[0] != 1 && this.fetchData([this.state.currentIds[0]-1, this.state.currentIds[1]-1, this.state.currentIds[2]-1])}>Previous</button>
          <button className="next" onClick={()=>this.fetchData([this.state.currentIds[0]+1, this.state.currentIds[1]+1, this.state.currentIds[2]+1])}>Next</button>
       </div>
        </div>
    );
  }
}

export default App;
