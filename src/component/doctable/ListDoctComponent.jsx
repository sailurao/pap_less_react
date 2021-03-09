import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Select from 'react-select';
import QRious from "qrious";

class ListDoctComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
		    jobs:[],
            docrows: [],
			myWorkId: 0,
            message: null,
			flag1:0,
			flag2:0
        }
		this.timer=0;
		this.flag=false;
        this.deleteEmp = this.deleteEmp.bind(this);
        this.editEmp = this.editEmp.bind(this);
        this.addEmp = this.addEmp.bind(this);
//        this.emailEmp = this.emailEmp.bind(this);
        this.reloadEmpList = this.reloadDocList.bind(this);
       // this.generateQR = this.generateQR.bind(this);
		this.TmrEvent = this.TmrEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
    }

    componentDidMount() {
    	ApiService.fetchJobrows()
					.then((res) => {
						this.setState({jobs: res.data.result});
					this.setState({flag2: 1});	
					this.reloadDocList();
	   });				
					
    }
	
    onChange = (e) => {
		this.setState({ myWorkId: e.target.value });
        e.preventDefault();
	    this.setState({flag1: 0});	
		
		window.localStorage.setItem("workid", e.target.value);
		
        ApiService.fetchDocrows1(e.target.value)
            .then((res) => {
                this.setState({docrows: res.data.result});
				this.setState({flag1: 1});	
           });
    }	
	
   handleChange(e) {
    this.setState({myWorkId: e.value});
		window.localStorage.setItem("workid", e.value);
		
        ApiService.fetchDocrows1(e.value)
            .then((res) => {
                this.setState({docrows: res.data.result});
				this.setState({flag1: 1});	
           });	
  }
	
	
	
   /* reloadDocList() {
		this.setState({flag1: 0});	
        ApiService.fetchDocrows1(this.state.myWorkId)
            .then((res) => {
                this.setState({docrows: res.data.result});
				this.setState({flag1: 1});	
           });
			
    	ApiService.fetchJobrows()
					.then((res) => {
						this.setState({jobs: res.data.result});
					this.setState({flag2: 1});	
	   });	
    }*/
	
reloadDocList() {
        var str5 = window.localStorage.getItem("workid");
		this.setState({myWorkId:str5});
        ApiService.fetchDocrows1(str5)
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
        this.props.history.push('/edit-doct');
    }

    /*emailEmp(id) {
	   ApiService.emailDocrow(id);
	   alert("Invitation Email Sent Succesfully!");
    }*/

    addEmp() {
        //window.localStorage.removeItem("userId");
		window.localStorage.setItem("workid", this.state.myWorkId);
        this.props.history.push('/add-doct');
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
 
 
     //Get JOB list
    getJobList(){
        const jobs = this.state.jobs;
        /*const jobs0=[" "]; //empty row at the beginning
        let emplst0 = jobs0.map((item, i) => {
        return (
            <option key={i} value={item.jobid}>{item.jobid}</option>
        )
        }, this);*/

        let emplst1 = jobs.length > 0
        && jobs.map((item, i) => ({ label: item.jobid, value: item.jobid }));

        //let emplst= emplst0.concat(emplst1);
        return emplst1;
    }



    render() {
        const Tbl1Style = { borderTopWidth: 1, borderWidth:3, borderColor: 'red',borderStyle: 'solid'};
        console.log("OM SRI RAM-LIST DOC");//Getting the path data -  https://reactgo.com/react-router-current-route/
        const myJobLst=this.getJobList(); //get all jobs list	
		return (
            <div>
			    <form>
				<div className="form-group">
                    <label>WORK ID: {this.state.myWorkId}</label>
                  {/*  <select  id="workid" name="workid" selected={this.state.myWorkId} className="form-control" value={this.state.myWorkId} onChange={this.onChange}>*/}
                 <Select  value={this.state.myWorkId} onChange={value => this.handleChange(value)}  options={myJobLst} />
				  
				  {/*      {myJobLst}*/}
			       {/* </select> 										*/}
                </div>
				</form>
                <h2 className="text-center" class="title">Document Details</h2>
                <button className="btn btn-danger" style={{width:'200px'}} onClick={() => this.addEmp()}> Add Document</button>
                {/*<table className="table table-striped">*/}
                <table id='students'>
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>WORKCENTER</th>
                            <th>DOC-PATH</th>
                            <th>DOC-NAME</th>
                            <th>DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
					
						{
                            this.state.docrows.map(
                        emp =>   
                                    <tr style={{ border: '10px'}} key={emp.id}>
                                        <td>{emp.workcenter}</td>
                                        <td>{emp.docpath}</td>
                                        <td>{emp.docname}</td>
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

export default ListDoctComponent;