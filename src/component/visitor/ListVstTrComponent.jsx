import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListVstTrComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees:[],
			empnew:[],
            vsttrs: [],
            vsttrs1: [],
            visitors:[],
			employees:[],
            flag1:false,
			flag2:false,
			company:'',
            message: null
        }
        this.deleteVstTr = this.deleteVstTr.bind(this);
        this.editVstTr = this.editVstTr.bind(this);
        this.addVstTr = this.addVstTr.bind(this);
        this.reloadVstTrList1 = this.reloadVstTrList1.bind(this);
        this.reloadVstTrList2 = this.reloadVstTrList2.bind(this);
        this.getVstName = this.getVstName.bind(this);
        this.getEmpName = this.getEmpName.bind(this);
		
    }

    getVstName(vstId){
       var i;
        i=0;
        var len = this.state.visitors.length;
		var str;
		var cmp="";
        for(i=0;i<len;i++){
            if(vstId==this.state.visitors[i].id){ //if ID matches?
			   str=this.state.visitors[i].firstName+" "+this.state.visitors[i].lastName;
			   cmp = this.state.visitors[i].company;
			   this.setState({company:cmp});
               return str;
            }
        }
        this.setState({company:cmp});
        return "";
    }

    componentDidMount() {
        this.reloadVstTrList1();
    }

    reloadVstTrList1() {
            	    console.log("om sri Ram1"); //Getting the path data -  https://reactgo.com/react-router-current-route/
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

        ApiService.fetchVisitorTrs()
            .then((res) => {
                this.setState({vsttrs1: res.data.result});
                this.setState({flag1: true});
                this.reloadVstTrList2();
            });

        ApiService.fetchVisitors()
            .then((res) => {
                this.setState({visitors: res.data.result})
                this.setState({flag2: true});
                this.reloadVstTrList2();

            });
    }

    getEmpName(empId){
       var i;
        i=0;
        var len = this.state.employees.length;
        var str;
        for(i=0;i<len;i++){
            if(empId==this.state.employees[i].id){ //if ID matches?
               str=this.state.employees[i].firstName+" "+this.state.employees[i].lastName;
               return str;
            }
        }
        return "";
    }


    reloadVstTrList2() {

         if(this.state.flag1==false)
            return;
            
         if(this.state.flag2==false)
            return;
            
        var i;
            var len=this.state.vsttrs1.length;
            var temp=[];
            for(i=0;i<len;i++){
                let name = this.getVstName(this.state.vsttrs1[i].visid);
                let vsttrx = {id:this.state.vsttrs1[i].id,
							visid:name, 
							company: this.state.company,
							empname: this.getEmpName(this.state.vsttrs1[i].empid),
                            q1:this.state.vsttrs1[i].q1,
                            q2:this.state.vsttrs1[i].q2,
                            q3:this.state.vsttrs1[i].q3,
                            q4:this.state.vsttrs1[i].q4,
                            q5:this.state.vsttrs1[i].q5,
                            temp:this.state.vsttrs1[i].temp,
                            date:this.state.vsttrs1[i].date,
                            time:this.state.vsttrs1[i].time,
                            };
                temp[i]=vsttrx;
            }
            this.setState({vsttrs:temp});
            	    console.log("om sri Ram2"); //Getting the path data -  https://reactgo.com/react-router-current-route/


    }
 
    deleteVstTr(vstId) {
        ApiService.deleteVisitorTr(vstId)
           .then(res => {
               this.setState({message : 'Visitor deleted successfully.'});
               this.setState({vsttrs: this.state.vsttrs.filter(vst => vst.vst_id !== vstId)});
           })
		   window.location.reload();

    }

    editVstTr(id) {
/*        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-visitor');*/
    }

    addVstTr() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-visitor-tr');
    }/*  */

    render() {
        return (
            <div>
                <h2 className="text-center" class="title">Visitor Transaction Details</h2>
                <button className="btn btn-danger" style={{width:'200px'}} onClick={() => this.addVstTr()}> Add Transaction</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Visitor</th>
                            <th>Company</th>
                            <th>Meeting With</th>
                            <th>Date</th>
                            <th>Time</th>
{/*                            <th>Temp(&#8457;)</th>  */}
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                            <th>Q4</th>
{/*                            <th>Q5</th>  */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.vsttrs.map(
                        vst =>
                                    <tr key={vst.id}>
                                        <td>{vst.visid}</td>
                                         <td>{vst.company}</td>
                                         <td>{vst.empname}</td>
                                       <td>{vst.date}</td>
                                        <td>{vst.time}</td>
                                        <td>{vst.q1}</td>
                                        <td>{vst.q2}</td>
                                        <td>{vst.q3}</td>
                                        <td>{vst.q4}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deleteVstTr(vst.id)}> Delete</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListVstTrComponent;