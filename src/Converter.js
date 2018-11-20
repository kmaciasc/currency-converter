import React, { Component } from 'react';
import './Converter.css';

class Converter extends Component {

  constructor(){
    super()
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.updateUserInput = this.updateUserInput.bind(this);

    this.state = {
      baseCurrency: "",
      targetCurrency: "",
      userInput: "",
      result: ""
    };
}

  render() {
    return (
      <div className="Converter">
        <div className="Converter-label-container">
          <label className="Converter-label-selector">Base Currency</label>
          <label  className="Converter-label-selector" >Target Currency</label>
        </div>
        <div>
          <select {...this.getCurrentProps()}>
            {this.getListOptions()}
          </select>
          <button {...this.getButtonProps()}>Switch</button>
          <select {...this.getTargetProps()}>
            {this.getListOptions()}
          </select>
        </div>
        <div>
            <div>
              <label className="Converter-label">{this.state.baseCurrency}</label>
              <input {...this.getUserInputProps()} /><br/>
            </div>
          <label className="Converter-result"> {this.state.result}</label>
        </div>
      </div>
    );
  }

  getTargetProps() {
    return {
      id: "target",
      className: "Converter-info",
      onChange: this.handleOnChange,
      value: this.state.targetCurrency
    };
  }

  getCurrentProps() {
    return {
      id: "base",
      className: "Converter-info",
      onChange: this.handleOnChange,
      value: this.state.baseCurrency
    };
  }

  getUserInputProps () {
    return {
      className: "Converter-info",
      id: "inputText" ,
      onChange: this.updateUserInput,
      type: "number",
    };
  }

  getButtonProps () {
    return {
      className: "Converter-button",
      onClick: this.handleOnClick
    };
  }


  getListOptions() {
    var data = this.props.ratesList;
    var firstElement = (<option value={0} >Select...</option>);
    var result = [firstElement];

    for (var item in data) {
      result.push(
        <option value={item}>{item}</option>
      );
    }

    return result;
  }

  handleOnChange (event) {
    if (event.target.id === "base") {
      this.setState({
        baseCurrency: event.target.value
      },this.calculateRate);
    }
    else if (event.target.id === "target") {
      this.setState({
        targetCurrency: event.target.value
      } ,this.calculateRate);
    }
  }

  handleOnClick () {
    var newBase = this.state.targetCurrency;
    var newTarget = this.state.baseCurrency;

    this.setState({
      baseCurrency: newBase,
      targetCurrency: newTarget
    },this.calculateRate);

  }

  updateUserInput(event) {
    this.setState({
      userInput: event.target.value
    }, this.calculateRate);
  }

  calculateRate () {
    if(this.state.userInput !== "") {
      var currency = this.state.baseCurrency;
      var target = this.state.targetCurrency;
      var userInputValue = this.state.userInput;

      if (target !== "" && currency !== "" ) {
        var conversion =
          userInputValue + " " + currency + " = " +
          this.convert(userInputValue) + " " + target;

        this.setState({
          result: conversion
        });

        }

      }
  }

  convert(value) {
    var ratesList = this.props.ratesList;
    var baseCurrencyValue = ratesList[this.state.baseCurrency];
    var targetCurrencyValue = ratesList[this.state.targetCurrency];
    var result;

    if (baseCurrencyValue && targetCurrencyValue) {
      result = (value / baseCurrencyValue) * targetCurrencyValue;
    }
    return parseFloat(Math.round(result * 100) / 100).toFixed(2);
  }

}

export default Converter;
