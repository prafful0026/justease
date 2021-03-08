import React from "react";
import Axios from 'axios'
class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
    }

    handleSubmit=async event=>{
     event.preventDefault();
     const{email,password}=this.state;
     Axios.post('/updateData',{email:email,password:password})
     console.log({email});
     this.setState({email:"",password:""})
    }
handleChange=event=>{
    const{value,name}=event.target;
    this.setState({[name]:value})
}
render(){
    return(
        <div onSubmit={this.handleSubmit} >
         <form action="">
          <input type="email"  value={this.state.email} name="email" onChange={this.handleChange} />
          <input type="password"  value={this.state.password} name="password" onChange={this.handleChange} />
          <input type="submit" onSubmit={this.handleSubmit} />
         </form>
        </div>
    )
}
    
}

export default Login;