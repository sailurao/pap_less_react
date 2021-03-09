import React, { Component } from 'react'


class EmpAlert1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            message: null
        }
      //  this.reloadEmpList = this.reloadEmpList.bind(this);
    }

    componentDidMount() {
        //this.reloadEmpList();
    }

  
    render() {
      const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        boarder:"5px",
        padding: "10px",
        paddingleft: "250px",
        fontFamily: "Arial"
      };

      const h1Style = {
        marginLeft: '100px',
        color: "red",
      };

      const h2Style = {
        marginLeft: '50px',
      };
        return (
            <div>
           <h1 style={h1Style}> Not Approved to enter PDI.  </h1>
           <h2 style={h2Style}> For the safety of all, PDI asks you to stay home and call in to talk with your supervisor.  Thank you. </h2>
           
            </div>
        );
    }

}

export default EmpAlert1;
