import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import Counters from './components/counters';

class App extends React.Component {
  state = {
    counters: [
      { id: 1, value: 4},
      { id: 2, value: 0},
      { id: 3, value: 0},
      { id: 4, value: 0}
    ]
  }

  handleIncrement = (counter) => {
    const counters = this.state.counters.map(c => {
      if(c.id === counter.id) {c.value++}
      return c;
    })
    this.setState({counters})
  }

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    })
    this.setState({counters})
  }

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter(c => c.id != counterId);
    this.setState({counters});
  };

  handleDecrement = (counter) => {
    const counters = this.state.counters.map(c => {
      if(c.id === counter.id) {
        if(c.value > 0) {
          c.value--;
        }
      }
      return c;
    })
    this.setState({counters});
  }

  render() { 
    return (
      <React.Fragment>
        <NavBar totalCounters={this.state.counters.filter(c => c.value > 0).length} />
        <main className="container">
          <Counters counters={this.state.counters} onReset={this.handleReset} onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} onDelete={this.handleDelete} />
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;