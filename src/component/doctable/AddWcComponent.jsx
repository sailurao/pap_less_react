import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddWcComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            workcenter: '',
            description: '',
            message: null
        }
        this.saveDocrow = this.saveDocrow.bind(this);
    }

    saveDocrow = (e) => {
        e.preventDefault();
		let str1 = this.state.workcenter+this.state.description+Math.floor(Math.random()*1000000);
        let emp = {userid: str1,description: this.state.description, workcenter:this.state.workcenter};
        ApiService.addWcrow(emp)
            .then(res => {
                this.setState({message : 'Docrow added successfully.'});
                this.props.history.push('/workcenters');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Workcenter</h2>
                <form>
                <div className="form-group">
                    <label>WORKCENTER:</label>
                    <input placeholder="workcenter" name="workcenter" className="form-control" value={this.state.workcenter} onChange={this.onChange}/>
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

export default AddWcComponent;