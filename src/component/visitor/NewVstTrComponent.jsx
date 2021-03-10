import React, { Component , useState }  from 'react'
import ApiService from "../../service/ApiService";

class NewVstTrComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            employees:[],
			empnew:[],
		    visitor: {
			    id:'',
				firstName: '',
				lastName: '',
				userid: '',
				cell: '',
				email: '',
				address: ''
				},
            vstid: '',
            date: '',
            time: '',
            temp: '98',
            q1: 'yes',
            q2: 'yes',
            q3: 'yes',
            q4: 'yes',
            q5: 'yes',
			empid:'',
			emp_name:'',
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
        this.saveVisitorTr = this.saveVisitorTr.bind(this);
        this.getEmployeeList=this.getEmployeeList.bind(this);
    }

    componentDidMount() {
	    var str = this.props.location.pathname; //Getting the path data -  https://reactgo.com/react-router-current-route/
		var str2="new-vst-tr/";
		var pos = str.search(str2);
		
		if(pos > 0){
		   pos = pos + str2.length;
		   var str1 = str.slice(pos);   
		   this.setState({vstid: str1});
		   
			ApiService.fetchVisitor(str1)
            .then((res) => {
                this.setState({visitor: res.data.result})

            });	
            var str4 = this.state.visitor.id.toString();	
		   this.setState({vstid: str4});
		}
		else{
		   this.setState({vstid: ""}); //vst ID not found
		}

		ApiService.fetchEmployees()
            .then((res) => {
                this.setState({employees: res.data.result});
				
				//now make new list
				var len = this.state.employees.length;
				var i=0;
				let emp=[];
				for(i=0;i<len;i++){
                   let val ={ id:this.state.employees[i].id, name: this.state.employees[i].firstName+ " " + this.state.employees[i].lastName};	
                   emp[i]=val;				   
				}
				this.setState({empnew:emp});
        });	
        
	    console.log(this.state.vstid); //Getting the path data -  https://reactgo.com/react-router-current-route/
    }


    saveVisitorTr = (e) => {
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
		
        let vsttr = {visid: this.state.visitor.id,empid:this.state.empid, date: date1, time: time1, temp:this.state.temp, q1:this.state.q1, q2:this.state.q2,q3:this.state.q3,q4:this.state.q4,q5:this.state.q5};
        ApiService.addVisitorTr(vsttr)
            .then(res => {
                this.setState({message : 'Visitor Transaction added successfully.'});
                let my_str1;
                if((vsttr.q1=='yes')||(vsttr.q2=='yes')||(vsttr.q3=='yes')||(vsttr.q4=='yes')){
                   // my_str1="Not Approved to enter PDI. For the safety of all, PDI asks you to stay home and call in to talk with your supervisor.  Thank you.";
                    this.props.history.push('/vstalrt1');
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
		if(e.target.name == "empid"){
		   let id =  e.target.value;
		   //let str = this.state.employees[id].firstName+ " " + this.state.employees[id].lastName;
			//this.setState({ emp_name: str });
		}
    }
    set_high = () => {  
      this.setState({ setIsShown:1});
    }

    set_low = () => {  
      this.setState({ setIsShown:0});
    }

    //Get Employees list
    getEmployeeList(){
        const employees = this.state.empnew;

        let emplst = employees.length > 0
        && employees.map((item, i) => {
        return (
            <option key={i} value={item.id}>{item.name}</option>
        )
        }, this);

        return emplst;
    }

    render() {
        console.log(this.state.visitor.id);
        const myEmpLst=this.getEmployeeList(); //get all employee list
        return(
            <div className="form-group">
                <h2 className="text-center" class="title">Daily Health Screen Questionnaire for Employees and Visitors</h2>
                <form>
                
                <div className="form-group">
                    <label>Visitor Name:</label>
                    <input placeholder="Visitor Id" name="vstid" className="form-control" value={this.state.visitor.firstName + " " + this.state.visitor.lastName} onChange={this.onChange} readonly/>
                </div>

               <div className="form-group">
                    <label>Whom are you visiting: </label>
                    <select  id="empid" name="empid" value={this.state.empnew.name} onChange={this.onChange}>
				        {myEmpLst}
			        </select> 
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
                <button className="btn btn-success" onClick={this.saveVisitorTr}>Submit</button>
            </form>
    </div>
        );
    }
}

export default NewVstTrComponent;