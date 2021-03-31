import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditWcComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
		    id:'',
            workcenter: '',
            description: '',
            message: null
		}
        this.saveDocrow = this.saveDocrow.bind(this);
        this.loadWcrow = this.loadWcrow.bind(this);
    }

    componentDidMount() {
        this.loadWcrow();
    }

    loadWcrow() {
        ApiService.fetchWcrowById(window.localStorage.getItem("userId"))
            .then((res) => {
                let emp = res.data.result;
                this.setState({
				id:emp.id,
                workcenter: emp.workcenter,
                description: emp.description,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveDocrow = (e) => {
        e.preventDefault();
		let str1 = this.state.workcenter+this.state.description+Math.floor(Math.random()*1000000);
        let emp = {id:this.state.id,userid: str1,workcenter: this.state.workcenter, description: this.state.description};
        ApiService.editWcrow(emp)
            .then(res => {
                this.setState({message : 'Wcrow edited successfully.'});
                this.props.history.push('/workcenters');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Workcenter Details</h2>
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

export default EditWcComponent;