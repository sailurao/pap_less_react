import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListEmpTrComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emptrs: [],
            emptrs1: [],
            employees:[],
            flag1:false,
            flag2:false,
            message: null
        }
        this.deleteEmpTr = this.deleteEmpTr.bind(this);
        this.editEmpTr = this.editEmpTr.bind(this);
        this.addEmpTr = this.addEmpTr.bind(this);
        this.reloadEmpTrList1 = this.reloadEmpTrList1.bind(this);
        this.reloadEmpTrList2 = this.reloadEmpTrList2.bind(this);
        this.getEmpName = this.getEmpName.bind(this);
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

    componentDidMount() {
        this.reloadEmpTrList1();
    }

    reloadEmpTrList1() {
            	    console.log("om sri Ram1"); //Getting the path data -  https://reactgo.com/react-router-current-route/
        ApiService.fetchEmployeeTrs()
            .then((res) => {
                this.setState({emptrs1: res.data.result});
                this.setState({flag1: true});
                this.reloadEmpTrList2();
            });

        ApiService.fetchEmployees()
            .then((res) => {
                this.setState({employees: res.data.result})
                this.setState({flag2: true});
                this.reloadEmpTrList2();

            });
    }

    reloadEmpTrList2() {

         if(this.state.flag1==false)
            return;
            
         if(this.state.flag2==false)
            return;
            
        var i;
            var len=this.state.emptrs1.length;
            var temp=[];
            for(i=0;i<len;i++){
                let name = this.getEmpName(this.state.emptrs1[i].empid);
                let emptrx = {id:this.state.emptrs1[i].id,
                            empid:name, 
                            q1:this.state.emptrs1[i].q1,
                            q2:this.state.emptrs1[i].q2,
                            q3:this.state.emptrs1[i].q3,
                            q4:this.state.emptrs1[i].q4,
                            q5:this.state.emptrs1[i].q5,
                            temp:this.state.emptrs1[i].temp,
                            date:this.state.emptrs1[i].date,
                            time:this.state.emptrs1[i].time,
                            };
                temp[i]=emptrx;
            }
            this.setState({emptrs:temp});
            	    console.log("om sri Ram2"); //Getting the path data -  https://reactgo.com/react-router-current-route/


    }
 
    deleteEmpTr(empId) {
        ApiService.deleteEmployeeTr(empId)
           .then(res => {
               this.setState({message : 'Employee deleted successfully.'});
               this.setState({emptrs: this.state.emptrs.filter(emp => emp.emp_id !== empId)});
           })
		   window.location.reload();

    }

    editEmpTr(id) {
/*        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-employee');*/
    }

    addEmpTr() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-employee-tr');
    }/*  */

    render() {
        return (
            <div>
                <h2 className="text-center" class="title">Employee Transaction Details</h2>
                <button className="btn btn-danger" style={{width:'200px'}} onClick={() => this.addEmpTr()}> Add Transaction</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Time</th>
 {/*                           <th>Temp(&#8457;)</th> */}
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                            <th>Q4</th>
{/*                             <th>Q5</th>  */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.emptrs.map(
                        emp =>
                                    <tr key={emp.id}>
                                        <td>{emp.empid}</td>
                                        <td>{emp.date}</td>
                                        <td>{emp.time}</td>
{/*                                         <td>{emp.temp}</td>  */}
                                        <td>{emp.q1}</td>
                                        <td>{emp.q2}</td>
                                        <td>{emp.q3}</td>
                                        <td>{emp.q4}</td>
{/*                                         <td>{emp.q5}</td>  */}
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deleteEmpTr(emp.id)}> Delete</button>
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

export default ListEmpTrComponent;