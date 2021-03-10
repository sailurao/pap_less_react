import React, { Component , useState }  from 'react'
import ApiService from "../../service/ApiService";

class NewTrComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
		    employee: {
			    id:'',
				firstName: '',
				lastName: '',
				userid: '',
				cell: '',
				email: '',
				address: ''
				},
            empid: '',
            date: '',
            time: '',
            temp: '98',
            q1: 'yes',
            q2: 'yes',
            q3: 'yes',
            q4: 'yes',
            q5: 'yes',
            message: null,
			isShown:false,
          setIsShown:false			
        }
		const styleObj = {
			fontSize: 14,
			color: "#4a54f1",
			border: "2px solid red",
			textAlign: "center",
			paddingTop: "1px",
	   }		
        this.saveEmployeeTr = this.saveEmployeeTr.bind(this);
    }

    componentDidMount() {
	    var str = this.props.location.pathname; //Getting the path data -  https://reactgo.com/react-router-current-route/
		var str2="new-tr/";
		var pos = str.search(str2);
		
		if(pos > 0){
		   pos = pos + str2.length;
		   var str1 = str.slice(pos);   
		   this.setState({empid: str1});
		   
			ApiService.fetchEmployee(str1)
            .then((res) => {
                this.setState({employee: res.data.result})
            });	
            var str4 = this.state.employee.id.toString();	
		   this.setState({empid: str4});
		}
		else{
		   this.setState({empid: ""}); //emp ID not found
		}
		
	    console.log(this.state.empid); //Getting the path data -  https://reactgo.com/react-router-current-route/
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
		
        let emptr = {empid: this.state.employee.id, date: date1, time: time1, temp:this.state.temp, q1:this.state.q1, q2:this.state.q2,q3:this.state.q3,q4:this.state.q4,q5:this.state.q5};
        ApiService.addEmployeeTr(emptr)
            .then(res => {
                this.setState({message : 'Employee Transaction added successfully.'});
                let my_str1;
                if((emptr.q1=='yes')||(emptr.q2=='yes')||(emptr.q3=='yes')||(emptr.q4=='yes')){
                   // my_str1="Not Approved to enter PDI. For the safety of all, PDI asks you to stay home and call in to talk with your supervisor.  Thank you.";
                    this.props.history.push('/empalrt1');
                }
                else{
                     //       my_str1="Approved to enter PDI. Thank you.";
                    this.props.history.push('/empalrt2');

                }


            });
		//alert(my_str1);
        //window.close();
        //var customWindow = window.open('', '_blank', '');
        //customWindow.close();        
    }

    onChange = (e) =>{
	    //const location = useLocation();
  	    //console.log(location.pathname); // path is /contact
        this.setState({ [e.target.name]: e.target.value });
    }
    set_high = () => {  
      this.setState({ setIsShown:1});
    }

    set_low = () => {  
      this.setState({ setIsShown:0});
    }


    render() {
	    console.log(this.state.employee.id);
        return(
            <div>
                <h2 className="text-center" class="title">Daily Health Screen Questionnaire for Employees and Visitors</h2>
                <form>
                
                <div className="form-group">
                    <label>Employee Name:</label>
                    <input placeholder="Employee Id" name="empid" className="form-control" value={this.state.employee.firstName + " " + this.state.employee.lastName} onChange={this.onChange} readonly/>
                </div>

                
              <div className="form-group">
                    <label>1. Are you experiencing any Covid-19 <u onMouseEnter={this.set_high} onMouseLeave={this.set_low}>symptoms</u> or suspect you may have it (Y/N)?</label>
				  <input type="radio" id="yes" name="q1" value="yes" onChange={this.onChange}/><strong>YES</strong> {"			"}
				  <input type="radio" id="no" name="q1" value="no" onChange={this.onChange}/><strong>NO</strong> 
                </div>      
				{(this.state.setIsShown!=0)&& (<div> <p style={this.styleObj}>
				Symptoms of COVID-19 include fever (>=100.4F, 38C), cough, shortness of breath, difficulty breathing, or at least two of the following symptoms: chills, shaking with chills, muscle pain, headache, sore throat, and loss of taste or smell. Symptoms can range from mild to severe and may appear up to two weeks after exposure to the virus, according to the CDC. Some people with COVID-19 don't display any symptoms. This list does not include all possible symptoms. Other less common symptoms have been reported, including gastrointestinal symptoms like nausea, vomiting, or diarrhea.</p></div>)
				}
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
                    <label>4. Are you running a temperature above 100.3F without the use of fever reducing medicine (Y/N)?</label>
				  <input type="radio" id="yes" name="q4" value="yes" onChange={this.onChange}/><strong>YES</strong> {"			"}
				  <input type="radio" id="no" name="q4" value="no" onChange={this.onChange}/><strong>NO</strong> 
                </div>
{/*                <div className="form-group">
                    <label>Enter Body Temperature &#8457; :</label>
                    <input placeholder="Temp" type="number" name="temp" className="form-control" value={this.state.temp} onChange={this.onChange}/>
                </div>

            */}
                <button className="btn btn-success" onClick={this.saveEmployeeTr}>Submit</button>
            </form>
    </div>
        );
    }
}

export default NewTrComponent;