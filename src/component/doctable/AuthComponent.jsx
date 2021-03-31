import React, { Component } from "react";
import ApiService from "../../service/ApiService";

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
	  isAuth:false,
	  count:0,
      message: null
    };
	this.timer=0;
    this.AuthSubmit = this.AuthSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
	this.TmrEvent = this.TmrEvent.bind(this);
  }

  componentDidMount() {
    				   console.log("om sri Ram1- authentication1");

                   if(this.state.count != 0){
				   
						   let str = 	localStorage.getItem("token");
						   if(str !=undefined){
									this.setState({token: str});
						   }				   
				   
				   
						   ApiService.ChkMyToken(str)
												.then((res) => {
													  let emp = res.data.result;
													  let str = res.data.message;										
												
														if(str== "match"){
																this.setState({isAuth:true}); //useState(true);
																window.location.assign("/doctables");
														}
														else{
																this.setState({isAuth:false}); //useState(false);
														}
												});	  
				}

  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  AuthSubmit = (e) => {
    e.preventDefault();
    let auth = { username: this.state.username, password: this.state.password };
            ApiService.getAuthenticated(auth)
            .then(res => {
							let emp = res.data.result;
                            let str = res.data.message;													
							if(str != ""){
							
							    if(emp.username=="admin")
									window.localStorage.setItem("admin","true");
								else
									window.localStorage.setItem("admin","false");
								

							 
								window.localStorage.setItem("token",str);
								this.setState({token:str}); //set token
								this.setState({isAuth:true}); //set token
								this.setState({count:1}); //reset count to trigger component Mount
								this.timer = setInterval(this.TmrEvent, 5000);
								//this.props.history.push('/employees'); //main page
								window.location.assign("/doctables");
							}
							else{
								window.localStorage.setItem("admin","false");
								this.setState({token:"hello"}); //useState(false);
								this.setState({isAuth:false}); //set token
								alert("Wrong Username and Password !");
								window.localStorage.removeItem("token");
								this.setState({count:1}); //reset count to trigger component Mount
//								this.props.history.push('/employees'); //page not found
								window.location.assign("/doctables");

							}
            });
  };


 TmrEvent() {
          clearInterval(this.timer);
	
   				   console.log("om sri Ram1- Timer Event");

				   
						   let str = 	localStorage.getItem("token");
						   if(str !=null){
									this.setState({token: localStorage.getItem("token")});
						   }				   
				   
				   
						   ApiService.ChkMyToken(this.state.token)
												.then((res) => {
													  let emp = res.data.result;
													  let str = res.data.message;										
												
														if(str== "match"){
																this.setState({isAuth:true}); //useState(true);
																var str5 =window.localStorage.getItem("token");
																console.log("Token is:" + str5);

//																this.props.history.push('/employees'); //main page
															window.location.assign("/doctables");
														}
														else{
																this.setState({isAuth:false}); //useState(false);
														}
												});	  
	
  }




  render() {
    return (
      <div>
			{ this.state.isAuth && this.props.history.push('/doctables') }
        <h2 className="text-center" class="title">Please enter</h2>
        <form>
          <div className="form-group">
            <label>User Name:</label>
            <input
              placeholder="User Name"
              name="username"
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <p> </p>

          <div className="form-group">
            <label>Password:</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <p> </p>
          <p> </p>

          <button className="btn btn-success" onClick={this.AuthSubmit}>
            Submit
          </button>
        </form>
		
      </div>
    );
  }
}

export default AuthComponent;
