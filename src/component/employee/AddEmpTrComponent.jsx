import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddEmpTrComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            empid: '',
            date: '',
            time: '',
            temp: '98',
            q1: 'yes',
            q2: 'yes',
            q3: 'yes',
            q4: 'yes',
            q5: 'yes',
            message: null
        }
        this.saveEmployeeTr = this.saveEmployeeTr.bind(this);
    }

    saveEmployeeTr = (e) => {
        e.preventDefault();
		
			let today = new Date();

			let dt = today.getDate();
			let month = today.getMonth()+1;
		
			let dt1 = dt.toString().padStart(2, "0"); 
			let month1 = month.toString().padStart(2, "0"); 


			let date1 = (month1)+'-'+(dt1)+'-'+today.getFullYear();

			

			let hr = today.getHours();
			let min = today.getMinutes();
			let sec = today.getSeconds();
			let hr1 = hr.toString().padStart(2, "0"); 
			let min1 = min.toString().padStart(2, "0"); 
			let sec1 = sec.toString().padStart(2, "0"); 

		//	let time = //'abc'.padStart(8, "0"); 
			let time1 = hr1 +":"+min1+":"+sec1;		
				
				this.setState({ date: date1 });
				this.setState({ time: time1 });
		
        let emptr = {empid: this.state.empid, date: date1, time: time1, temp:this.state.temp, q1:this.state.q1, q2:this.state.q2,q3:this.state.q3,q4:this.state.q4,q5:this.state.q5};
        ApiService.addEmployeeTr(emptr)
            .then(res => {
                this.setState({message : 'Employee Transaction added successfully.'});
                this.props.history.push('/employee-trs');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

	
    render() {
        return(
            <div>
                <h2 className="text-center">Please answer below questionnaire</h2>
                <form>
                <div className="form-group">
                    <label>Employee Id:</label>
                    <input placeholder="Employee Id" name="empid" className="form-control" value={this.state.empid} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>1. Are you experiencing any Covid-19 symptoms or suspect you may have it (Y/N)?</label>
				  <input type="radio" id="yes" name="q1" value="yes" onChange={this.onChange}/><strong>YES</strong> {"			"}
				  <input type="radio" id="no" name="q1" value="no" onChange={this.onChange}/><strong>NO</strong> 
                </div>

                <div className="form-group">
                    <label>2. Have you been exposed (ie; within 6ft for 15 minutes or more without a mask)
                    to a positively diagnosed COVID-19 case within the last 2 weeks (Y/N)?</label>
				  <input type="radio" id="yes" name="q2" value="yes" onChange={this.onChange}/><strong>YES</strong> {"			"}
				  <input type="radio" id="no" name="q2" value="no" onChange={this.onChange}/><strong>NO</strong> 
                </div>

                <div className="form-group">
                    <label>3. Have you been to a facility within the last 2 weeks that has been exposed or shut down due to the COVID-19 virus (Y/N)?</label>
				  <input type="radio" id="yes" name="q3" value="yes" onChange={this.onChange}/><strong>YES</strong> {"			"}
				  <input type="radio" id="no" name="q3" value="no" onChange={this.onChange}/><strong>NO</strong> 
                </div>

                <div className="form-group">
                    <label>Enter Body Temperature &#8457; :</label>
                    <input placeholder="Temp" type="number" name="temp" className="form-control" value={this.state.temp} onChange={this.onChange}/>
                </div>


                <button className="btn btn-success" onClick={this.saveEmployeeTr}>Submit</button>
            </form>
    </div>
        );
    }
}

export default AddEmpTrComponent;