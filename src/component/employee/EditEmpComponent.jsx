import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditEmpComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
		    id:'',
            firstName: '',
            lastName: '',
            cell: '',
            email: '',
            address: '',
            message: null
        }
        this.saveEmployee = this.saveEmployee.bind(this);
        this.loadEmployee = this.loadEmployee.bind(this);
    }

    componentDidMount() {
        this.loadEmployee();
    }

    loadEmployee() {
        ApiService.fetchEmployeeById(window.localStorage.getItem("userId"))
            .then((res) => {
                let emp = res.data.result;
                this.setState({
				id:emp.id,
                firstName: emp.firstName,
                lastName: emp.lastName,
                cell: emp.cell,
                email: emp.email,
                address: emp.address,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveEmployee = (e) => {
        e.preventDefault();
		let str1 = this.state.firstName+this.state.lastName+Math.floor(Math.random()*1000000);
        let emp = {id:this.state.id,userid: str1,firstName: this.state.firstName, lastName: this.state.lastName, email:this.state.email, cell:this.state.cell, address:this.state.address};
        ApiService.editEmployee(emp)
            .then(res => {
                this.setState({message : 'Employee edited successfully.'});
                this.props.history.push('/employees');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Employee</h2>
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

export default EditEmpComponent;