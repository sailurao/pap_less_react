import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditDoctComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
		    id:'',
            workcenter: '',
            docpath: '',
            docname: '',
			description: '',
            workid: '',
            message: null
		}
        this.saveDocrow = this.saveDocrow.bind(this);
        this.loadDocrow = this.loadDocrow.bind(this);
    }

    componentDidMount() {
        this.loadDocrow();
    }

    loadDocrow() {
        ApiService.fetchDocrowById(window.localStorage.getItem("userId"))
            .then((res) => {
                let emp = res.data.result;
                this.setState({
				id:emp.id,
                workcenter: emp.workcenter,
                docpath: emp.docpath,
                docname: emp.docname,
                workid: emp.workid,
                description: emp.description,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveDocrow = (e) => {
        e.preventDefault();
		let str1 = this.state.docpath+this.state.docname+Math.floor(Math.random()*1000000);
        let emp = {id:this.state.id,userid: str1,workcenter: this.state.workcenter, docpath: this.state.docpath, docname:this.state.docname, workid:this.state.workid,description:this.state.description};
        ApiService.editDocrow(emp)
            .then(res => {
                this.setState({message : 'Docrow edited successfully.'});
                this.props.history.push('/doctables');
            });
    }

    render() {
        console.log("om sri Ram1"); //Getting the path data -  https://reactgo.com/react-router-current-route/

        return (
            <div>
                <h2 className="text-center">Edit Docrow</h2>
                <form>

                <div className="form-group">
                    <label>WORKCENTER:</label>
                    <input placeholder="workcenter" name="workcenter" className="form-control" value={this.state.workcenter} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>DOCK-PATH:</label>
                    <input placeholder="DOCK PATH" name="docpath" className="form-control" value={this.state.docpath} onChange={this.onChange}/>
                </div>

				<div className="form-group">
                    <label>DOCK-NAME:</label>
                    <input placeholder="docname" name="docname" className="form-control" value={this.state.docname} onChange={this.onChange}/>
                </div>
				
				<div className="form-group">
                    <label>WORKID:</label>
                    <input placeholder="workid" name="workid" className="form-control" value={this.state.workid} onChange={this.onChange}/>
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

export default EditDoctComponent;