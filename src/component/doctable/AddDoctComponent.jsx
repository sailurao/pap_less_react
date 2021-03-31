import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddDoctComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
		    wcs:[],
		    jobs:[],
            workcenter: '',
            docpath: '',
            docname: '',
            workid: '',
			description: '',
			flag1:0,
			flag2:0,
            message: null
        }
        this.saveDocrow = this.saveDocrow.bind(this);
		this.getWcList=this.getWcList.bind(this);
		this.getJobList=this.getJobList.bind(this);
    }
	
	
   componentDidMount() {
   
        var str5 = window.localStorage.getItem("workid");
		this.setState({workid:str5});
   
		ApiService.fetchWcrows()
            .then((res) => {
                this.setState({wcs: res.data.result});
				this.setState({flag1: 1});
        });	
		
    	ApiService.fetchJobrows()
					.then((res) => {
						this.setState({jobs: res.data.result});
					this.setState({flag2: 1});	
	   });	
		
		
		
    }

	
	
	

    saveDocrow = (e) => {
        e.preventDefault();
		let str1 = this.state.docpath+this.state.docname+Math.floor(Math.random()*1000000);
        let emp = {userid: str1,docpath: this.state.docpath, docname: this.state.docname, workcenter:this.state.workcenter, workid:this.state.workid,description:this.state.description};
        ApiService.addDocrow(emp)
            .then(res => {
                this.setState({message : 'Docrow added successfully.'});
                this.props.history.push('/doctables');
            });
    }

    // On file select (from the pop up) 
    onFileChange = event => { 
      // Update the state 
	  var str = event.target.files[0];
      this.setState({ docname: str.name }); 
    }; 
	
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    //Get WC list
    getWcList(){
        const workcenters = this.state.wcs;
		const jobs0=[" "]; //empty row at the beginning
		let emplst0 = jobs0.map((item, i) => {
        return (
            <option key={i} value={item.jobid}>{item.jobid}</option>
        )
        }, this);
		
        let emplst1 = workcenters.length > 0
        && workcenters.map((item, i) => {
        return (
            <option key={i} value={item.workcenter}>{item.workcenter}</option>
        )
        }, this);
		
		let emplst= emplst0.concat(emplst1);
        return emplst;
    }

    //Get JOB list
    getJobList(){
        const jobs = this.state.jobs;
        const jobs0=[" "]; //empty row at the beginning
        let emplst0 = jobs0.map((item, i) => {
        return (
            <option key={i} value={item.jobid}>{item.jobid}</option>
        )
        }, this);

        let emplst1 = jobs.length > 0
        && jobs.map((item, i) => {
        return (
            <option key={i} value={item.jobid}>{item.jobid}</option>
        )
        }, this);

        let emplst= emplst0.concat(emplst1);
        return emplst;
    }

    render() {
        console.log("OM SRI RAM-ADD DOC");
        const myWcLst=this.getWcList(); //get all employee list	
        const myJobLst=this.getJobList(); //get all employee list	
        return(
            <div>
                <h2 className="text-center">Adding Document</h2>
                <form>
               <div className="form-group">
                    <label>WORKID:</label>
                    <input  readOnly name="workid" className="form-control" value={this.state.workid} onChange={this.onChange}/>
                </div>
				
                <div className="form-group">
                    <label>WORKCENTER:</label>
                    <select  id="workcenter" name="workcenter" className="form-control" value={this.state.workcenter} onChange={this.onChange}>
				        {myWcLst}
			        </select> 					
					
                </div>

                <div className="form-group">
                    <label>FILE SELECTION</label>
                    <input type="file" className="form-control" onChange={this.onFileChange}/>
                </div>
                <div className="form-group">
                    <label>DOC-PATH:</label>
                    <input placeholder="docpath" name="docpath" className="form-control" value={this.state.docpath} onChange={this.onChange}/>
                </div>

				<div className="form-group">
                    <label>DOC-NAME:</label>
                    <input placeholder="docname" name="docname" className="form-control" value={this.state.docname} onChange={this.onChange}/>
                </div>
				
				<div className="form-group">
                    <label>DESCRIPTION:</label>
                    <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.onChange}/>
                </div>
				
				
				{/*
				<div className="form-group">
                    <label>WORKID:</label>
                    <select  id="workid" name="workid" className="form-control" value={this.state.workid} onChange={this.onChange}>
				        {myJobLst}
			        </select> 										
                </div> */}
				
                <button className="btn btn-success" onClick={this.saveDocrow}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddDoctComponent;