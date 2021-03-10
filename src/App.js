/**********************************************************
* FILE NAME:       App.js
* PROJECT NAME:    COVID_PROJECT
* AUTHOR:           NAGA AMAM
* START DATE:       11/20/2020
* DESCRIPTION:      This is the main APP.Js file consists of all routing and switching
*                   
*************************************************************/

import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ListUserComponent from "./component/user/ListUserComponent";
import AddUserComponent from "./component/user/AddUserComponent";
import EditUserComponent from "./component/user/EditUserComponent";


import ListEmpComponent from "./component/employee/ListEmpComponent";
import AddEmpComponent from "./component/employee/AddEmpComponent";
import EditEmpComponent from "./component/employee/EditEmpComponent";

import ListEmpTrComponent from "./component/employee/ListEmpTrComponent";
import AddEmpTrComponent from "./component/employee/AddEmpTrComponent";
import NewTrComponent from "./component/employee/NewTrComponent";
import EmpAlert1 from "./component/employee/EmpAlert1";
import EmpAlert2 from "./component/employee/EmpAlert2";

import ListVstComponent from "./component/visitor/ListVstComponent";
import AddVstComponent from "./component/visitor/AddVstComponent";
import EditVstComponent from "./component/visitor/EditVstComponent";
import ListVstTrComponent from "./component/visitor/ListVstTrComponent";
import NewVstTrComponent from "./component/visitor/NewVstTrComponent";
import VstAlert1 from "./component/visitor/VstAlert1";


import pdi_img from './images/pdi_logo.png'; // gives image path
import styles from './App.css'; 

import Navbar from "./component/Navbar";
import ApiService from "./service/ApiService";
import AuthComponent from "./component/employee/AuthComponent";
import logout from "./component/employee/logout";

import ListDoctComponent from "./component/doctable/ListDoctComponent";
import AddDoctComponent from "./component/doctable/AddDoctComponent";
import EditDoctComponent from "./component/doctable/EditDoctComponent";
import ListWcComponent from "./component/doctable/ListWcComponent";
import AddWcComponent from "./component/doctable/AddWcComponent";
import EditWcComponent from "./component/doctable/EditWcComponent";
import ListJobtComponent from "./component/doctable/ListJobtComponent";
import AddJobtComponent from "./component/doctable/AddJobtComponent";
import EditJobtComponent from "./component/doctable/EditJobtComponent";


class App extends React.Component {
	
	   constructor(props) {
        super(props)
        this.state = {
					 isAuth: false,
					 token:"hello"
				}
			}
			
			componentDidMount() {
				   console.log("om sri Ram1- authentication");
				   let str = 	localStorage.getItem("token");
           if(str !=null){
							this.setState({token: str});
						}
										
 				   ApiService.ChkMyToken(str)
										.then((res) => {
										      let emp = res.data.result;
                          let str = res.data.message;										
										
												if(str== "match"){
														this.setState({isAuth:true}); //useState(true);
												}
												else{
														this.setState({isAuth:false}); //useState(false);
												}
										});
										
										
      }
	
   render() {
		 const h2Style = {
						marginLeft: '10px',
					};    
  return (
      <div className="container">
          <Router>
							<div className="form-group">
              </div>
              <div className="col-md-6">
	                <table className="table table-striped">
										<tr>
	                    <td>  </td>
	                     <td>  </td>
	                    <td>
													{/*<h1 className="text-center" style={style}>OM SRI RAM</h1>*/}			
													<img src={pdi_img} alt="this is PDI image" style={h2Style}/>
                      </td>
                    </tr>
                   </table>
									{this.state.isAuth && <Navbar />	}
									{/*!this.state.isAuth && <AuthComponent />	*/}
									<div className="form-group" style={{ marginTop: 40 }}>
									 </div>
   	              <div className="form-group">
									<Switch>
                      {this.state.isAuth && <Route path="/" exact component={ListDoctComponent} /> }
                      {this.state.isAuth && <Route path="/doctables" component={ListDoctComponent} /> }
                      {this.state.isAuth && <Route path="/add-doct" component={AddDoctComponent} /> }
                      {this.state.isAuth && <Route path="/edit-doct" component={EditDoctComponent} /> }
                      {this.state.isAuth && <Route path="/jobtables" component={ListJobtComponent} /> }
                      {this.state.isAuth && <Route path="/add-jobt" component={AddJobtComponent} /> }
                      {this.state.isAuth && <Route path="/edit-jobt" component={EditJobtComponent} /> }
                      {this.state.isAuth && <Route path="/workcenters" component={ListWcComponent} /> }
                      {this.state.isAuth && <Route path="/add-wct" component={AddWcComponent} /> }
                      {this.state.isAuth && <Route path="/edit-wct" component={EditWcComponent} /> }
                      {this.state.isAuth && <Route path="/employee-trs" component={ListEmpTrComponent} /> }
                      {this.state.isAuth && <Route path="/add-employee-tr" component={AddEmpTrComponent} /> }
                      <Route path="/new-tr" component={NewTrComponent} />
                      <Route path="/empalrt1" component={EmpAlert1} />
                      <Route path="/empalrt2" component={EmpAlert2} />
                       {!this.state.isAuth && <Route path="/auth" component={AuthComponent} /> }
                      {this.state.isAuth && <Route path="/visitors" component={ListVstComponent} /> }
                      {this.state.isAuth && <Route path="/add-visitors" component={AddVstComponent} /> }
                      {this.state.isAuth && <Route path="/edit-visitor" component={EditVstComponent} /> }
                      {this.state.isAuth && <Route path="/visitor-trs" component={ListVstTrComponent} /> }
                      <Route path="/new-vst-tr" component={NewVstTrComponent} />
                      <Route path="/vstalrt1" component={VstAlert1} />
                      <Route path="/logout" component={logout} />
										  {!this.state.isAuth && <Redirect to="/auth"/> }
                  </Switch>
								  </div>
              </div>
          </Router>
      </div>
    );
	}											 
}

const style = {
    color: 'red',
    marginleft: '100px'
}

export default App;
