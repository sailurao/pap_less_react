import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddJobtComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            jobid: '',
            description: '',
            message: null
        }
        this.saveDocrow = this.saveDocrow.bind(this);
    }

    saveDocrow = (e) => {
        e.preventDefault();
		let str1 = this.state.jobid+this.state.description+Math.floor(Math.random()*1000000);
        let emp = {userid: str1,jobid: this.state.jobid, description: this.state.description};
        ApiService.addJobrow(emp)
            .then(res => {
                this.setState({message : 'Jobtable row added successfully.'});
                this.props.history.push('/jobtables');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Job table Row</h2>
                <form>
                <div className="form-group">
                    <label>JOB ID:</label>
                    <input placeholder="jobid" name="jobid" className="form-control" value={this.state.jobid} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>JOB DESCRIPTION:</label>
                    <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.onChange}/>
                </div>

			
                <button className="btn btn-success" onClick={this.saveDocrow}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddJobtComponent;