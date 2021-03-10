import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditVstComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
		    id:'',
            firstName: '',
            lastName: '',
            company: '',
            cell: '',
            email: '',
            address: '',
            message: null
        }
        this.saveVisitor = this.saveVisitor.bind(this);
        this.loadVisitor = this.loadVisitor.bind(this);
    }

    componentDidMount() {
        this.loadVisitor();
    }

    loadVisitor() {
        ApiService.fetchVisitorById(window.localStorage.getItem("userId"))
            .then((res) => {
                let vst = res.data.result;
                this.setState({
				id:vst.id,
                firstName: vst.firstName,
                lastName: vst.lastName,
                company: vst.company,
                cell: vst.cell,
                email: vst.email,
                address: vst.address,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveVisitor = (e) => {
        e.preventDefault();
		let str1 = this.state.firstName+this.state.lastName+Math.floor(Math.random()*1000000);
        let vst = {id:this.state.id,userid: str1,firstName: this.state.firstName, lastName: this.state.lastName, company:this.state.company,email:this.state.email, cell:this.state.cell, address:this.state.address};
        ApiService.editVisitor(vst)
            .then(res => {
                this.setState({message : 'Visitor edited successfully.'});
                this.props.history.push('/visitors');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center" class="title">Edit Visitor</h2>
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
                    <label>Company Name:</label>
                    <input placeholder="Company Name" name="company" className="form-control" value={this.state.company} onChange={this.onChange}/>
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

                    <button className="btn btn-success" onClick={this.saveVisitor}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditVstComponent;