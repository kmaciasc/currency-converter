import React, { Component } from 'react';
import './Rates.css';

class Rates extends Component {

  render() {
    return (
      <div className="Rates">
        <h3>Currency rates</h3>
        <h4>Base rate: {this.props.base}</h4>
        {this.getRates()}
        <div></div>
      </div>
    );
  }

  getRates() {
    var data = this.props.ratesList;
    var result = [];

    for (var item in data) {
      result.push(
        <div className="Rates-cell">
          <h2>{item}</h2>
          <h3>{data[item]}</h3>
        </div>
      );
    }

    return result;
  }
}

export default Rates;
