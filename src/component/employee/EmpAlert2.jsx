import React, { Component } from 'react'

class EmpAlert2 extends Component {

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
          marginLeft: "100px",
          color: "green"
        };

        const h2Style = {
          marginLeft: "150px",
          color: "green"
        };
        return (
          <div>
            <h1 style={h1Style}>Approved to enter PDI. </h1>
            <h1 style={h2Style}> Thank you. </h1>
          </div>
        );
    }

}

export default EmpAlert2;
