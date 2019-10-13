
import React, { Component } from "react";

class SideBar extends Component {
    render(){

        let amount = JSON.parse(localStorage.getItem('amount'));
        //let years = JSON.parse(localStorage.getItem('years'));

        //let lis = document.querySelectorAll('li');
        //lis.addEventListener('click', getValue);


        function getValue(e){
            let a = e.target.getAttribute('amount'); 
            let y = e.target.getAttribute('years'); 
            console.log(a,y);

            this.props.changeValue(a,y);
        }
        let temp1;
        if(amount !== null){
            temp1 = amount.map((amount,i) => {
                return(
                    <li onClick={getValue.bind(this)} key={i} amount={amount.amount} years={amount.years}>
                         Amount: {amount.amount} Months: {amount.years} </li>
                )
            })

        }
        
       /* if(years !== null){ser
            temp2 = years.map((years,i) => {
                return(
                    <li key={i}> Years: {years} </li>
                )
            })

        }*/
        
        
      return (
          <div>
              <h2 className="rec">Last 15 Values</h2>
                <ul>
                    {temp1}
                </ul>
          </div>
        
      )
    }
  }

  export default SideBar;
