import React, { Component } from 'react';
import Converter from './Converter'
import Loading from './Loading'
import Header from './Header';
import Rates from './Rates';
import './App.css';

class App extends Component {

  API_URL = 'http://data.fixer.io/api/latest?access_key=16a13605441f53ae9d1425e8cdd94623&format=1';

  constructor() {
    super();
    this.state = {
      currencyData: {},
    };
  }

  componentDidMount() {
     fetch(this.API_URL)
      .then(response => response.json())
      .then(data => this.setState({currencyData: data}));
  }

  render() {
    var component;
    var data = this.state.currencyData;
    if (data.success) {
      component = (
        <div>
          <Header/>
          <div>
            <div className="App-column">
              <Converter base={data.base} ratesList={data.rates}/>
            </div>
            <div className="App-column">
              <Rates base={data.base} ratesList={data.rates}/>
            </div>
          </div>
        </div>
      );
    } else {
      component = (
        <div>
          <Loading/>
        </div>
      );
    }
    return component;
  }
}

export default App;
