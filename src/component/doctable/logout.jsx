import React, { Component } from 'react'
import ApiService from "../../service/ApiService";


class logout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            message: null
        }
      //  this.reloadEmpList = this.reloadEmpList.bind(this);
    }

    componentDidMount() {
	    var str = window.localStorage.getItem("token");
		
	    window.localStorage.removeItem("token");
        console.log("token is :"+str);
		if(str != null){
						   ApiService.ChkMyToken("hello")
												.then((res) => {
													  let emp = res.data.result;
													  let str = res.data.message;										
														window.location.reload();
												});	  
				
			
			
		 }
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
           <h1 style={h1Style} class="title"> You are logged out!  </h1>
            </div>
        );
    }

}

export default logout;
