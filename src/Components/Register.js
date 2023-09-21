import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toaster from './sucessToaster';
import {toast} from 'react-toastify';
import axios from 'axios';
import LoadingSpinner from './spinner';
import NavLogin from './navlogin';
import {BaseUrl, PromError} from './helperfunctions';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { number } from 'sinon/lib/sinon/match';
//import GoogleIcon from '@material-ui/icons/Google';
import form from '../images/form.jpg';
import '../form.css';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            phoneNumber:'',
            password:'',
            spinnershow: false
        }
    }
    postDataToBackend = async (data) =>{
            axios.post(BaseUrl()+'/Users/create',data)
                .then((response)=> {
                    console.log(response.data)
                    this.setState({spinnershow:false})
                //display successful registration on a toaster
                    toast.success(response.data.message)
                //redirect to login page if user registers successfully
                    this.props.history.push("/login")
            })
            .catch((error)=> {
                //set the state of spinner to false so as not to show
                this.setState({spinnershow:false})
                console.log(error.response)
                //display the error to the user
                PromError(error, this)
            });
    };
    handleSubmit = (event) => {
        //method that sends user request to api if user click on register button
        event.preventDefault();
        //this.setState({spinnershow:true})
        var payload={
            "id":"edadf6de-3c62-4447-8fe6-e9ceadd5a9ua",
            "firstName":this.state.first_name,
            "lastName":this.state.last_name,
            "phoneNumber":this.state.phoneNumber,
            "email":this.state.email,
            "password":this.state.password,
            // "name": `${this.state.first_name}${this.state.last_name}`
        }
        this.postDataToBackend(payload);
    }
    render() {
        return (
            <div>
                <Toaster/>
                <MuiThemeProvider>
                    <div className='container card'>
                        <div className='row'>
                            <NavLogin/>
                            <div className='col-5'>
                                <Card style={customCardStyle}>
                                    <div style={{textAlign: "center",marginTop:"3%"}}>
                                        <CardHeader className='card-text'  style={{paddingBottom:0,fontWeight:"bold"}} title = "Create an account"/>
                                        <CardText style={{paddingTop:0}}>
                                            {/*call method handleclick on onsubmit*/}
                                            <form onSubmit={this.handleSubmit}>
                                            <TextField
                                                hintText="Enter your First Name"
                                                floatingLabelText="First Name"
                                                id="fname"
                                                floatingLabelStyle={{color:"darkgrey"}}
                                                onChange = {(event) => this.setState({first_name:event.target.value})}
                                            />
                                            <br/>
                                            <TextField
                                                hintText="Enter your Last Name"
                                                floatingLabelText="Last Name"
                                                id="lname"
                                                floatingLabelStyle={{color:"darkgrey"}}
                                                onChange = {(event) => this.setState({last_name:event.target.value})}
                                            />
                                            <br/>
                                            <TextField
                                                hintText="Enter your Email"
                                                type="email"
                                                id="email"
                                                floatingLabelText="Email"
                                                floatingLabelStyle={{color:"darkgrey"}}
                                                onChange = {(event) => this.setState({email:event.target.value})}
                                            />
                                            <br/>
                                            <TextField
                                                hintText="Enter your Phone Number"
                                                type="number"
                                                id="phoneNumber"
                                                floatingLabelText="Phone Number"
                                                floatingLabelStyle={{color:"darkgrey"}}
                                                onChange = {(event) => this.setState({phoneNumber:event.target.value})}
                                            />
                                            <br/>
                                            <TextField
                                                type = "password"
                                                hintText="Enter your Password"
                                                id="password"
                                                floatingLabelText="Password"
                                                floatingLabelStyle={{color:"darkgrey"}}
                                                onChange = {(event) => this.setState({password:event.target.value})}
                                            />
                                            <br/>
                                            {this.state.spinnershow ?
                                                <center><LoadingSpinner/></center> :
                                            <button className='btn btn-dark btn-rounded button' type="submit" primary={true} id="submit" style={style}>Create account</button>}
                                            <button  className='btn btn-dark btn-rounded button' type="submit" primary={true} id="submit" style={style}>Sign up with Google</button>
                                            </form>
                                        </CardText>
                                    </div>
                                </Card>
                            </div>
                            <div className='col image-container'>
                                <img className='image' src={form}/>
                                <a href="/login" class="btn btn-light btn-rounded image-button">Log in</a>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
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
export default Register;
