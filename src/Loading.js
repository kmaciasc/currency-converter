import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {

  render() {
    return (
      <div className="Loading">
        <h2>Please wait</h2>
        <h3>We were loading the currency rates data</h3>
      </div>
    );
  }
}

export default Loading;
