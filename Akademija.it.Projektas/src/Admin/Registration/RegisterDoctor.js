import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {API} from "./HostUrl"
import axios from 'axios';

class RegisterDoctor extends Component {

    state= {
        firstName: '',
        lastName: '',
        specialization: '',
        password: '',
        value: 0
      }
    
      handleClick(event) {
        var apiUrl = API;
    
        //set values
        var information= {
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          specialization: this.state.specialization,
          password : this.state.password,

        }
        console.log(information)
        axios.post(apiUrl + '/admin/doctor', information)
        .then(function (response){
          if (response.date.code === 200){
            console.log("registrations  succsessfull");
          }
        })
      }

    handleChange= (event, index, value) => this.setState({ value });



    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <span>
                    <div>
                        <TextField
                            hintText="Iveskite Varda"
                            floatingLabelText="Vardas"
                            onChange={(event, newValue) => this.setState({ first_name: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Iveskite pavarde"
                            floatingLabelText="pavarde"
                            onChange={(event, newValue) => this.setState({ last_name: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Confirm Password"
                            floatingLabelText="Confirm password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br/>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={0} primaryText="Specializacija" />
                            <MenuItem value={1} primaryText="Gydytojas" />
                            <MenuItem value={2} primaryText="Chirurgas" />
                            <MenuItem value={3} primaryText="Fizioterapeutas" />
                        </DropDownMenu>
                        <br />
                        <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)} />
                    </div>
                    </span>
                </MuiThemeProvider>
            </div>
        );
    }
}


export default RegisterDoctor;