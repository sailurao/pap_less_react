import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddEmpComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            cell: '',
            email: '',
            address: '',
            message: null
        }
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    saveEmployee = (e) => {
        e.preventDefault();
		let str1 = this.state.firstName+this.state.lastName+Math.floor(Math.random()*1000000);
        let emp = {userid: str1,firstName: this.state.firstName, lastName: this.state.lastName, email:this.state.email, cell:this.state.cell, address:this.state.address};
        ApiService.addEmployee(emp)
            .then(res => {
                this.setState({message : 'Employee added successfully.'});
                this.props.history.push('/employees');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Employee</h2>
                <form>
                <div className="form-group">
                    <label>First Name:</label>
                    <input placeholder="First Name" name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input placeholder="Last name" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange}/>
                </div>

				<div className="form-group">
                    <label>Email:</label>
                    <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                </div>
				
				<div className="form-group">
                    <label>Cell:</label>
                    <input placeholder="Mobile Number" name="cell" className="form-control" value={this.state.cell} onChange={this.onChange}/>
                </div>
				
				<div className="form-group">
                    <label>Address:</label>
                    <input placeholder="Address" name="address" className="form-control" value={this.state.address} onChange={this.onChange}/>
                </div>
                <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddEmpComponent;