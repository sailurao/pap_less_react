import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import QRious from "qrious";

class ListJobtComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            docrows: [],
            message: null
        }
		this.timer=0;
		this.flag=false;
        this.deleteEmp = this.deleteEmp.bind(this);
        this.editEmp = this.editEmp.bind(this);
        this.addEmp = this.addEmp.bind(this);
//        this.emailEmp = this.emailEmp.bind(this);
        this.reloadEmpList = this.reloadJobList.bind(this);
       // this.generateQR = this.generateQR.bind(this);
		this.TmrEvent = this.TmrEvent.bind(this);
    }

    componentDidMount() {
        this.reloadJobList();
    }

    reloadJobList() {
        ApiService.fetchJobrows()
            .then((res) => {
                this.setState({docrows: res.data.result})
				this.timer = setInterval(this.TmrEvent, 1000);
            });
    }

    deleteEmp(empId) {
        ApiService.deleteDocrow(empId)
           .then(res => {
               this.setState({message : 'Doc-Row deleted successfully.'});
               this.setState({docrows: this.state.docrows.filter(emp => emp.emp_id !== empId)});
           })
		   window.location.reload();

    }

    editEmp(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-jobt');
    }

    /*emailEmp(id) {
	   ApiService.emailDocrow(id);
	   alert("Invitation Email Sent Succesfully!");
    }*/

    addEmp() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-jobt');
    }
	
	 /*generateQR = (val) => {
	    let str = ApiService.getEmpQrCodeUrl(val);
		let arg = {
		  element: document.getElementById(val),
		  value: str
		};
		 new QRious(arg);		
     };	*/
	

//timer event 
 TmrEvent() {
  /*        clearInterval(this.timer);
   				   console.log("om sri Ram1- Timer Event");
				   
	      if(this.flag==false){
			  this.flag=true;
              var len=this.state.docrows.length;
			  var id;
              var i;
			  for(i=0;i<len;i++){
			     id = this.state.docrows[i].userid;
				 this.generateQR(id);
			  }
		  }*/
 }


    render() {
 
           	    console.log("om sri Ram1"); //Getting the path data -  https://reactgo.com/react-router-current-route/

		  const Tbl1Style = { borderTopWidth: 1, borderWidth:3, borderColor: 'red',borderStyle: 'solid'};

		return (
            <div>
                <h2 className="text-center" class="title">JOB ID/Description Details</h2>
                <button className="btn btn-danger" style={{width:'200px'}} onClick={() => this.addEmp()}> Add Job</button>
                {/*<table className="table table-striped">*/}
                <table id='students'>
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>JOB-ID</th>
                            <th>JOB-DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
					
						{
                            this.state.docrows.map(
                        emp =>   
                                    <tr style={{ border: '10px'}} key={emp.id}>
									
                                        <td>{emp.jobid}</td>
                                        <td>{emp.description}</td>
                                        <td>
											<table id="students1" style={{ border: '0px'}}> 
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.deleteEmp(emp.id)} style={{ border: '0px',width: '100px'}}> Delete</button></td></tr>
                                            <tr style={{ border: '0px'}}><td><button className="btn btn-success" onClick={() => this.editEmp(emp.id)} style={{ width: '100px'}}> Edit</button></td></tr>
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

export default ListJobtComponent;