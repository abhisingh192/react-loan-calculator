import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';

import InputRange from "react-input-range";

import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";
import SideBar from "./Sidebar";


//let rec;
 //rec = [{amount:500,years:6}];
 //localStorage.setItem('amount',JSON.stringify(rec));

class Calculator extends Component {

  

  state = {
    amountValue: 500,
    yearsValue: 6,
    interestRate: 0.25,  // *** Use appropriate initial values, 0 probably isn't the right choice
    monthlyPayment: 93
  };

 /* componentDidMount() {
    let rec;
    rec = [{amount:500,years:6}];
    localStorage.setItem('amount',JSON.stringify(rec));
    this.setState({ interestRate: 0.25, monthlyPayment: 93.0});
    
    
  }*/

  changeValue = (a,y) => {
    this.setState({ amountValue: a, yearsValue:y});
    let c = a;
    let d = y;

    fetch("https://ftl-frontend-test.herokuapp.com/interest?amount="+c+"&numMonths="+d)
      .then(res => {                                   //
        if (!res.ok) {                                 // *** Note the necessary error handling
          throw new Error("HTTP error " + res.status); //
        }                                              //
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            interestRate: result.interestRate,
            monthlyPayment: result.monthlyPayment.amount
          });
        },
      )
      .catch(err => {
        // *** Handle/display error here
      });

  }

 /* updateValues = (x,y) =>{
    this.setState({ interestRate: x, monthlyPayment:y});

  }*/

  getValues = (a,y) => {
    let b = a;
    let t = y;

    fetch("https://ftl-frontend-test.herokuapp.com/interest?amount="+b+"&numMonths="+t)
      .then(res => {                                   //
        if (!res.ok) {                                 // *** Note the necessary error handling
          throw new Error("HTTP error " + res.status); //
        }                                              //
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            interestRate: result.interestRate,
            monthlyPayment: result.monthlyPayment.amount
          });
        },
      )
      .catch(err => {
        // *** Handle/display error here
      });
  }

  
  handleAmountChange = value => {
    this.setState({ amountValue: value});

    let amount;
    let recent;

    if(localStorage.getItem('amount') === null){
      amount = [];
    }
    else{
      amount = JSON.parse(localStorage.getItem('amount'));
    }
    recent = {amount:value, years:this.state.yearsValue}
    amount.unshift(recent);
    //console.log(recent);

    if(amount.length>15){
      amount.pop();

    } // set length to remove elements*/

    localStorage.setItem('amount', JSON.stringify(amount));
    //console.log(recent.amount);
    //console.log(recent.years);

    this.getValues(recent.amount, recent.years);

  };

  handleYearChange = value => {
    this.setState({ yearsValue: value });

  
    let amount;
    let recent;

    if(localStorage.getItem('amount') === null){
      amount = [];
    }
    else{
      amount = JSON.parse(localStorage.getItem('amount'));
    }
    recent = {amount:this.state.amountValue, years:value}
    //console.log(recent);

    amount.unshift(recent);
    if(amount.length>15){
      amount.pop();

    }
    localStorage.setItem('amount', JSON.stringify(amount));
   

    this.getValues(recent.amount, recent.years);


  };

  render() {
    const { amountValue, yearsValue } = this.state;

    return (
      
      <Container> <Row>
      < Col sm={4}>
      <div className=" col-sm-4 w3-sidebar w3-light-grey w3-bar-block side" style={{width: "'50%'"}}>
         
        <SideBar changeValue={this.changeValue}/>
      </div>
      </Col>
      
      <Col sm={8}>
      <div className="App col-sm-8">
       <h1 className="abc"> <strong>Loan Calculator</strong></h1>
       <div className="slider">
       <h4 className="mt-3">Select Amount: ${amountValue}</h4>
       <InputRange
         step={100}
         maxValue={5000}
         minValue={500}
         value={amountValue}
         onChange={this.handleAmountChange}
       />
       </div>
       
       <div className="slider">
       <h4 className="mt-3 ">
         Select Time: {yearsValue} months
       </h4>
       
       <InputRange className="mb-3"
         step={1}
         maxValue={24}
         minValue={6}
         value={yearsValue}
         onChange={this.handleYearChange}
       />
       </div>
       

          <div className="xyz">
            <h6 className="mt-3 abc">Monthly Payment $: <strong>{this.state.monthlyPayment}</strong> </h6>
            <h6 className="abc">Interest %: <strong>{Math.round(this.state.interestRate* 100)}</strong></h6>
          </div>
     

       </div>
     
       
      </Col>
     

      </Row></Container>
        
      
    
  
    );
  }
}

export default Calculator;
