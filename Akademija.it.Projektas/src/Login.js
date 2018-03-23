import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
//import { browserHistory } from 'react-router';
import healthCare from './healthCare.png';
import axios from 'axios';
import swal from 'sweetalert';

axios.defaults.withCredentials = true;

const style={
  margin: 15,
};

const image = {
  marginTop:50,
};



const Form = ({userName, pass,onPassChange, onUsernameChange,onSubmit},
context)=>{
  return   <div> <MuiThemeProvider>
    <form onSubmit={onSubmit}>
    <TextField
      className="username"
      id="inputUserName"
      floatingLabelText="Prisijungimo vardas"
      type="username"
      onChange={onUsernameChange}
    />
    <br/>
     <TextField
        className="password"
        id="inputPassword"
      floatingLabelText="Slaptažodis"
      type="password"
      value = {pass}
      onChange={onPassChange}
    />
    <br/>
    <RaisedButton type="submit" style={style}
     label="Prisijungti" id="loginButton">
    </RaisedButton>
    </form>
    </MuiThemeProvider>
   
    </div>

}

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state={
      userName: '',
      password: ''
 
    }
  }
  onUsernameChange = (event) =>{
    this.setState ({userName:event.target.value})}

    onPassChange = (event) =>{
      this.setState ({pass:event.target.value})}

      onSubmit = (event)=>{
        let userData = new URLSearchParams();
        userData.append('username',this.state.userName)
        userData.append('password',this.state.pass)
 
        axios.post('http://localhost:8081', userData,
      {headers:{'Content-type':'application/x-www-form-urlencoded'}})
      .then((response)=> { 
        console.log(response);
        console.log("login success");
        console.log("getting user data");
        axios.get('http://localhost:8081/authorized-user/get-user-infos/'+ this.state.userName)
             .then((resp)=>{
               let user = resp.data;
               window.sessionStorage.setItem("userData", JSON.stringify(user));
               if(user.role==='PATIENT'){
                 console.log("Redirecting to patient");
                 window.location.href = "/#/patient";
               }else if(user.role==='ADMIN'){
                window.location.href = "/#/admin";
               }else if(user.role==='PHARMACIST'){
                window.location.href = "/#/pharmacist";
              }else if(user.role==='DOCTOR'){
                window.location.href = "/#/doctor";
              }else if(user.role === "SUSPENDED"){
                window.location.href = "/#/"
                swal({
                  text: "Vartotojas yra suspenduotas!",
                  icon: "error",
                 button: "Gerai",
              });
              }
                console.log(resp);
             }).catch((err)=>{console.log(err)});
      })


      .catch((e)=>{console.log(e);});
      event.preventDefault();
      }   


  render(){

    return (
      <div>
        <div>
        <img alt={"sveikata"} src={healthCare} style={image}/>
        </div>
      <div>
       <Form userName={this.state.userName} pass={this.state.pass}
        onUsernameChange={this.onUsernameChange}
        onPassChange={this.onPassChange}
        onSubmit={this.onSubmit}/>
       </div>
       </div>
    )
  }}
export default Login;