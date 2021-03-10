import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import QRious from "qrious";

class ListEmpComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            message: null
        }
		this.timer=0;
		this.flag=false;
        this.deleteEmp = this.deleteEmp.bind(this);
        this.editEmp = this.editEmp.bind(this);
        this.addEmp = this.addEmp.bind(this);
        this.emailEmp = this.emailEmp.bind(this);
        this.reloadEmpList = this.reloadEmpList.bind(this);
        this.generateQR = this.generateQR.bind(this);
		this.TmrEvent = this.TmrEvent.bind(this);
    }

    componentDidMount() {
        this.reloadEmpList();
    }

    reloadEmpList() {
        ApiService.fetchEmployees()
            .then((res) => {
                this.setState({employees: res.data.result})
				this.timer = setInterval(this.TmrEvent, 1000);
            });
    }

    deleteEmp(empId) {
        ApiService.deleteEmployee(empId)
           .then(res => {
               this.setState({message : 'Employee deleted successfully.'});
               this.setState({employees: this.state.employees.filter(emp => emp.emp_id !== empId)});
           })
		   window.location.reload();

    }

    editEmp(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-employee');
    }

    emailEmp(id) {
	   ApiService.emailEmployee(id);
	   alert("Invitation Email Sent Succesfully!");
    }

    addEmp() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-employee');
    }
	
	 generateQR = (val) => {
	    let str = ApiService.getEmpQrCodeUrl(val);
		let arg = {
		  element: document.getElementById(val),
		  value: str
		};
		 new QRious(arg);		
     };	
	

//timer event 
 TmrEvent() {
          clearInterval(this.timer);
   				   console.log("om sri Ram1- Timer Event");
				   
	      if(this.flag==false){
			  this.flag=true;
              var len=this.state.employees.length;
			  var id;
              var i;
			  for(i=0;i<len;i++){
			     id = this.state.employees[i].userid;
				 this.generateQR(id);
			  }
		  }
 }


    render() {
 
           	    console.log("om sri Ram1"); //Getting the path data -  https://reactgo.com/react-router-current-route/

		  const Tbl1Style = { borderTopWidth: 1, borderWidth:3, borderColor: 'red',borderStyle: 'solid'};

		return (
            <div>
                <h2 className="text-center" class="title">Employee Details</h2>
                <button className="btn btn-danger" style={{width:'200px'}} onClick={() => this.addEmp()}> Add Employee</button>
                {/*<table className="table table-striped">*/}
                <table id='students'>
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>UserId</th>
                            <th>Email</th>
                            <th>MobileNumber</th>
                            <th>Address</th>
                            <th></th>
                            <th>QR CODE</th>
                        </tr>
                    </thead>
                    <tbody>
					
						{
                            this.state.employees.map(
                        emp =>   
                                    <tr style={{ border: '10px'}} key={emp.id}>
									
                                        <td>{emp.firstName}</td>
                                        <td>{emp.lastName}</td>
                                        <td>{emp.userid}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.cell}</td>
                                        <td>{emp.address}</td>
                                        <td>
											<table id="students1" style={{ border: '0px'}}> 
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.deleteEmp(emp.id)} style={{ border: '0px',width: '100px'}}> Delete</button></td></tr>
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.editEmp(emp.id)} style={{ width: '100px'}}> Edit</button></td></tr>
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.emailEmp(emp.id)} style={{ width: '100px'}}> Send Email</button></td></tr>
											</table> 
										</td>
                                        <td>
											<table id="no" style={{ border: '0px'}}> 
											<tr>
											<td ><canvas id={emp.userid} style={{ border: '50px'}}/></td></tr>
											</table> 
										</td>
                                    </tr>
                            )
							
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

/*
class TableRow extends React.Component {
   render() {
      var emp = this.props.emp;
      return (
                                   <tr key={emp.id}>
                                        <td>{emp.firstName}</td>
                                        <td>{emp.lastName}</td>
                                        <td>{emp.userid}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.cell}</td>
                                        <td>{emp.address}</td>
                                        <td>
											<table style={{ border: '0px'}}> 
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.deleteEmp(emp.id)} style={{ border: '0px',width: '100px'}}> Delete</button></td>
											<td rowspan='3'><canvas id={emp.userid} /></td></tr>
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.editEmp(emp.id)} style={{ width: '100px'}}> Edit</button></td></tr>
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.emailEmp(emp.id)} style={{ width: '100px'}}> Send Email</button></td></tr>
											</table> 
										</td>
                                    </tr>   }
}
*/


export default ListEmpComponent;