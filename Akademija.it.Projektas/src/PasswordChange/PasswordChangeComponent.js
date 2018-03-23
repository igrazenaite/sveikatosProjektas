import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {API} from "../Admin/SideBar/Registration/HostUrl";
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import swal from 'sweetalert';

const rowStyle={
    margin: 0,
}

const containerStyle={
    paddingLeft: 50,
}

const textStyles = {
    errorStyle: {
      color: orange500,
    },
    floatingLabelFocusStyle: {
      color: blue500,
    },
  };

class PasswordChangeComponent extends Component {

    constructor(){
        super()
        this.state= {
        password: '',
        newPassword: '',
        confirmPassword: ''
    }
} 

    bothPasswordsMatch(){
        if (this.state.newPassword===this.state.confirmPassword){
            return true;
        }
        else{
            swal({
                text: "Naujasis slaptažodis nesutampa su pakartotu naujuoju slaptažodžiu! Bandykite įvesti iš naujo.",
                icon: "error",
               button: "Gerai",
            });
        }
    }

    validPassword(){
        if(this.state.newPassword.length>=6&&
        this.state.newPassword.length<=30){
            return true;
        }
        else{
            swal({
                text: "Netinka slaptažodžio ilgis",
                icon: "error",
               button: "Gerai",
            });
        }
    }

    dataIsValid(){
        if (this.bothPasswordsMatch()&&
        this.validPassword()){
            return true;
        }
    }


    handleClick = (event)=>{

        if(this.dataIsValid()){

            let userData = window.sessionStorage.getItem('userData');
            let user = JSON.parse(userData);
            let passwordInfo={
                password: this.state.newPassword
            }
            axios({method:'PUT',
                url: "http://localhost:8081/" + user.role +"/"+ user.userId+"/changePassword", 
                headers:{'Content-type':'application/json'},
                data: passwordInfo})
            .then((response)=>{
                console.log("password change successful!");

                swal({
                    text: "Slaptažodis pakeistas!",
                    icon: "success",
                   button: "Gerai",
                });
            })
            .catch((error)=>{
                console.log(error);
            }) 
            
        }
        else{
            console.log("Neteisingi duomenys");
        } 
        event.preventDefault();
    }

    render() {
        return (
            <MuiThemeProvider>
            <div >
            <Container fluid={true} style={containerStyle}>
                <Row style={rowStyle}>
                <Col xs="12" md="12">
                <TextField
                    className="password"
                    id="inputPassword"
                    type="password"
                    hintText="Įveskite dabartinį slaptažodį"
                    errorText="Privalomas laukas"
                    errorStyle={textStyles.errorStyle}
                    floatingLabelText="Dabartinis slaptažodis"
                    floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
                    onChange={(event, newValue) => this.setState({ password: newValue })}
                />
                <br />
                <TextField
                    className="newPassword"
                    id="inputNewPassword"
                    type="password"
                    hintText="Nuo 6 iki 30 simbolių"
                    errorText="Privalomas laukas"
                    errorStyle={textStyles.errorStyle}
                    floatingLabelText="Įveskite naują slaptažodį"
                    floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
                    onChange={(event, newValue) => this.setState({ newPassword: newValue })}
                />
                <br />
                <TextField
                    className="confirmPassword"
                    id="inputConfirmPassword"
                    type="password"
                    hintText="Nuo 6 iki 30 simbolių"
                    errorText="Privalomas laukas"
                    errorStyle={textStyles.errorStyle}
                    floatingLabelText="Pakartokite naują slaptažodį"
                    floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
                    onChange={(event, newValue) => this.setState({ confirmPassword: newValue })}
                />
                <br />
                <RaisedButton className="submitButton" id="submitForm" label="Siųsti" primary={true} onClick={(event) => this.handleClick(event)} />
                </Col>
            </Row>
            </Container>
            </div>
            </MuiThemeProvider>
        )
    }
}
export default PasswordChangeComponent;