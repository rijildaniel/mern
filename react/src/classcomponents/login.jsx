import React, { Component } from 'react'
import HeaderComponent from './headercomponent';
import SecureCallService from '../services/securecallservice';
import { Link } from 'react-router-dom';
import ValidationComponent from './ValidationComponent';


class LoginComponent extends Component  {
    constructor(props)  {
        super(props);
        this.state = {
            username: '',
            password: '',
            uniqueUsername: true
        };
        this.serv = new SecureCallService();
    }

    handleInput=(evt) => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    logIn() {
        if(this.state.username === '' || this.state.password === '')    {
            alert('All input fields are required');
            return;
        }
        if(this.state.uniqueUsername === false)  {
            alert('Cannot submit the data');
            return;
        }
        const user = {
            Username: this.state.username,
            Password: this.state.password
        }
        this.serv.login(user)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
                sessionStorage.setItem('token', response.data.data);
                this.props.history.push('/dashboard/displayStudents');
            }
            else{
                alert('Unauthorized user');
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
    }
    checkForUniqueID(evt)  {

        let username = {
            Username: evt.target.value
        }
        this.serv.checkForUniqueId(username)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
            console.log(JSON.stringify(response.data));
            this.setState({uniqueUsername: true});
            }
            else{
                this.setState({uniqueUsername: false});
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
    }

    render()    {
        return (  
        <div>
            <HeaderComponent name="Login"></HeaderComponent>
        <div className="container">
          <center>
           <div className="panel-header">
                <p className="text-warning">Login to portal</p>
           </div>
           </center>
           <div className="panel-body">
              <center>
               <div className="form-group">
                  <input type="text"  id="username" className="form-control" onBlur={this.checkForUniqueID.bind(this)} style={{'width': '25%'}} placeholder="Username" value={this.state.username} onChange={this.handleInput.bind(this)} required/>
                  <ValidationComponent name="LoginUsername" data={this.state.uniqueUsername}></ValidationComponent>                  
               </div>
               <div className="form-group">
                  <input type="password" id="password" className="form-control" style={{'width': '25%'}} value={this.state.password} onChange={this.handleInput.bind(this)} placeholder="Password" required/>
               </div> 
               <div className="form-group">
                   <input type="submit" name="submit" value="Sign in" className="btn btn-primary" onClick={this.logIn.bind(this)}/>
               </div>
               </center>
               <center>
               <div className="panel-footer">
                   Don't have an account? <Link to='/register'>Register</Link>
               </div>  
              </center> 
           </div>
        </div>
        </div> 
        );
    }
}

export default LoginComponent;