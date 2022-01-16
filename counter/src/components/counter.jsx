import React, { Component } from 'react';

class Counter extends React.Component {
 
  render() {
    const {onIncrement, onDecrement, onDelete, counter} = this.props
    return(
      <React.Fragment>
        <div className='row'>
          <div className="col-1">
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>
          <div className="col">
            <button onClick={() => {onIncrement(counter)}} className='btn btn-secondary btn-sm'>+</button>
            <button onClick={() => {onDecrement(counter)}} className="btn btn-secondary btn-sm m-2" disabled={counter.value === 0 ? 'disabled' : ''}>-</button>
            <button onClick={() => (onDelete(counter.id))} className="btn btn-danger btn-sm">X</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  formatCount() {
    const { value: value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }

  getBadgeClasses() {
    let classes = 'badge m-2 badge-';
    classes += this.props.counter.value === 0 ? 'warning' : 'primary';
    return classes;
  }
}
 
export default Counter;