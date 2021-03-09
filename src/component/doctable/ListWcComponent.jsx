import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import QRious from "qrious";

class ListWcComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            wcs: [],
            message: null
        }
		this.timer=0;
		this.flag=false;
        this.deleteEmp = this.deleteEmp.bind(this);
        this.editEmp = this.editEmp.bind(this);
        this.addEmp = this.addEmp.bind(this);
//        this.emailEmp = this.emailEmp.bind(this);
        this.reloadEmpList = this.reloadWcList.bind(this);
       // this.generateQR = this.generateQR.bind(this);
		this.TmrEvent = this.TmrEvent.bind(this);
    }

    componentDidMount() {
        this.reloadWcList();
    }

    reloadWcList() {
        ApiService.fetchWcrows()
            .then((res) => {
                this.setState({wcs: res.data.result})
				this.timer = setInterval(this.TmrEvent, 1000);
            });
    }

    deleteEmp(empId) {
        ApiService.deleteWcrow(empId)
           .then(res => {
               this.setState({message : 'WC-Row deleted successfully.'});
               this.setState({wcs: this.state.wcs.filter(emp => emp.emp_id !== empId)});
           })
		   window.location.reload();

    }

    editEmp(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-wct');
    }

    /*emailEmp(id) {
	   ApiService.emailWcrow(id);
	   alert("Invitation Email Sent Succesfully!");
    }*/

    addEmp() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-wct');
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
              var len=this.state.wcs.length;
			  var id;
              var i;
			  for(i=0;i<len;i++){
			     id = this.state.wcs[i].userid;
				 this.generateQR(id);
			  }
		  }*/
 }


    render() {
 
           	    console.log("om sri Ram1"); //Getting the path data -  https://reactgo.com/react-router-current-route/

		  const Tbl1Style = { borderTopWidth: 1, borderWidth:3, borderColor: 'red',borderStyle: 'solid'};

		return (
            <div>
                <h2 className="text-center" class="title">Document Details</h2>
                <button className="btn btn-danger" style={{width:'200px'}} onClick={() => this.addEmp()}> Add WORKCENTER ROW</button>
                {/*<table className="table table-striped">*/}
                <table id='students'>
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>WORKCENTER</th>
                            <th>DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
					
						{
                            this.state.wcs.map(
                        emp =>   
                                    <tr style={{ border: '10px'}} key={emp.id}>
									
                                        <td>{emp.workcenter}</td>
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

export default ListWcComponent;