import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import QRious from "qrious";

class ListVstComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visitorss: [],
            message: null
        }
        this.timer=0;
	this.flag=false;
	this.deleteVst = this.deleteVst.bind(this);
        this.editVst = this.editVst.bind(this);
        this.addVst = this.addVst.bind(this);
        this.emailVst = this.emailVst.bind(this);
        this.reloadVstList = this.reloadVstList.bind(this);
        this.generateQR = this.generateQR.bind(this);
	this.TmrEvent = this.TmrEvent.bind(this);
     }

    componentDidMount() {
        this.reloadVstList();
    }

    reloadVstList() {
        ApiService.fetchVisitors()
            .then((res) => {
                this.setState({visitorss: res.data.result})
                this.timer = setInterval(this.TmrEvent, 1000);
            });
    }

    deleteVst(empId) {
        ApiService.deleteVisitors(empId)
           .then(res => {
               this.setState({message : 'Visitors deleted successfully.'});
               this.setState({visitorss: this.state.visitorss.filter(emp => emp.emp_id !== empId)});
           })
		   window.location.reload();

    }

    editVst(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-visitors');
    }

    emailVst(id) {
	   ApiService.emailVisitor(id);
	   alert("Invitation Email Sent Succesfully!");
    }

    addVst() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-visitors');
    }

   generateQR = (val) => {
	    let str = ApiService.getVstrQrCodeUrl(val);
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
              var len=this.state.visitorss.length;
			  var id;
              var i;
			  for(i=0;i<len;i++){
			     id = this.state.visitorss[i].userid;
				 this.generateQR(id);
			  }
		  }
 }


    render() {
        return (
            <div>
                <h2 className="text-center" class="title">Visitors Details</h2>
                <button className="btn btn-danger" style={{width:'200px'}} onClick={() => this.addVst()}> Add Visitors</button>
		{/*<table className="table table-striped">*/}
                <table id='students'>
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>MobileNumber</th>
                            <th>Address</th>
                            <th></th>
                            <th>QR CODE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.visitorss.map(
                        emp =>
                                     <tr style={{ border: '10px'}} key={emp.id}>
                                        <td>{emp.firstName}</td>
                                        <td>{emp.lastName}</td>
                                        <td>{emp.company}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.cell}</td>
                                        <td>{emp.address}</td>
                                        <td>
					    <table id="students1" style={{ border: '0px'}}> 
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.deleteVst(emp.id)} style={{ border: '0px',width: '100px'}}> Delete</button></td></tr>
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.editVst(emp.id)} style={{ width: '100px'}}> Edit</button></td></tr>
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.emailVst(emp.id)} style={{ width: '100px'}}> Send Email</button></td></tr>
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

export default ListVstComponent;