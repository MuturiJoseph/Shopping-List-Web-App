import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import axios from 'axios';
import React, { Component } from 'react';
import {toast} from 'react-toastify'
import Toaster from './sucessToaster'
import LoadingSpinner from './spinner'
import NavLogin from './navlogin'
import {BaseUrl, PromError} from './helperfunctions';
import form from '../images/form.jpg';

class Login extends  Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            spinnershow: false

        }

    }
    render (){
        return (
            <div>
            <Toaster/>
            <MuiThemeProvider>
                <div className='container card'>
                    <div className='row'>
                        <NavLogin/>
                        <Toaster/>
                        <div className='col-5'>
                            <Card style={customCardStyle}>
                                <div style={{textAlign: "center",marginTop:"3%"}}>
                                    <CardHeader className='card-text'  style={{paddingBottom:0,fontWeight:"bold"}} title = "Login"/>
                                    <CardText style={{paddingTop:0}}>
                                        {/*check if the state of the spinner is set*/}
                                        {this.state.spinnershow ?
                                        <center><LoadingSpinner/></center> : ""}
                                        {/*call method handleclick on onsubmit*/}
                                        <form onSubmit={this.handleClick}>
                                                <TextField
                                                hintText="Enter Your Email"
                                                type='email'
                                                id='email'
                                                floatingLabelText="Email"
                                                floatingLabelStyle={{color:"darkgrey"}}
                                                onChange={(event) => this.setState({email: event.target.value})}/><br/>
                                                <TextField hintText="Enter your password"
                                                type='password'
                                                id='password'
                                                floatingLabelText="Password"
                                                floatingLabelStyle={{color:"darkgrey"}}
                                                onChange={(event) => this.setState({password: event.target.value})}/>
                                            <br/>
                                            
                                            {/* <RaisedButton label="Submit" primary={true} id="btn" style={{marginTop: "10px"}} onClick={this.handleClick}/> */}
                                            <button className='btn btn-dark btn-rounded button' type="submit" primary={true} id="submit" style={style}>Sign In</button>
                                            <div style={{marginTop: "10px"}}><p>Not Registered. Please <a href={'/'}>sign
                                                up</a></p></div>
                                            <div style={{marginTop: "10px"}}><p><a href={'/passreset'}>forgot password?</a></p></div>
                                        </form>
                                    </CardText>
                                </div>
                            </Card>
                        </div>
                        <div className='col'>
                            <img src={form}/>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        </div>
        );
    }

    
    handleClick = (event) => {
        //function to login user after clicking login
        event.preventDefault();
        this.setState({spinnershow:true})
        var apiBaseUrl = BaseUrl()+'/Users/login';
        var payload={
            "userName":this.state.email,
            "password":this.state.password
        };
        axios({
            method: 'post',
            data: payload,
            url: apiBaseUrl,
        })
            .then((response) =>{
            //set spinnershow to false after promise
                this.setState({spinnershow:false})
                toast.success(response.data.message)
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('name');
                window.localStorage.setItem('token', response.data.access_token);
                window.localStorage.setItem('name', response.data.name);
                //redirect user to the dashboard if he logs in successfully
                this.props.history.push("/dashboard");


            })
            .catch((error) => {
            //set spinner false after promiose error
                this.setState({spinnershow:false})
                //call promise error function to handle all errors
                PromError(error, this)
            })
}

};
const style = {
    marginTop: 15,
    width:"16em",
    borderRadius:"15px",
    border:0,
    marginBottom:0
    // backgroundColor:'red',
    // color:"#ffff"
};
const customCardStyle = {
    backgroundColor: '#ffff',
    boxShadow:"none",
    // boxShadow: '5px 5px 10px gray',
  };
export default Login;
