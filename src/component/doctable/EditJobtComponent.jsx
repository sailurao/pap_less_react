import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditJobtComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
		    id:'',
            jobid: '',
            description: '',
            message: null
		}
        this.saveDocrow = this.saveDocrow.bind(this);
        this.loadJobtrow = this.loadJobtrow.bind(this);
    }

    componentDidMount() {
        this.loadJobtrow();
    }

    loadJobtrow() {
        ApiService.fetchJobrowById(window.localStorage.getItem("userId"))
            .then((res) => {
                let emp = res.data.result;
                this.setState({
				id:emp.id,
                jobid: emp.jobid,
                description: emp.description,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveDocrow = (e) => {
        e.preventDefault();
		let str1 = this.state.jobid+this.state.description+Math.floor(Math.random()*1000000);
        let emp = {id:this.state.id,userid: str1,jobid: this.state.jobid, description: this.state.description};
        ApiService.editJobrow(emp)
            .then(res => {
                this.setState({message : 'Job table row edited successfully.'});
                this.props.history.push('/jobtables');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Job Table Row</h2>
                <form>

                <div className="form-group">
                    <label>JOBID:</label>
                    <input placeholder="jobid" name="jobid" className="form-control" value={this.state.jobid} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>DESCRIPTION:</label>
                    <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.onChange}/>
                </div>
				
                    <button className="btn btn-success" onClick={this.saveDocrow}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditJobtComponent;