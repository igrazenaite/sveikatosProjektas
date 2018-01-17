import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {API} from "./HostUrl"
import axios from 'axios';

class RegisterPharmasist extends Component {

    state = {
        firstName: '',
        lastName: '',
        password: '',
        workplace: '',
        typeOfWorkplace: '',
        value: 'Pasirinkite Imones tipą',
    }

    handleClick(event) {
        var apiUrl = API;

        //set values
        var information = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            workplace: this.state.workplace,
            typeOfWorkplace: this.state.typeOfWorkplace
            
        }
        console.log(information)
        axios.post(apiUrl + '/admin/pharmasist', information)
            .then(function (response) {
                if (response.date.code === 200) {
                    console.log("registrations  succsessfull");
                }
            })
    }
    handleChange= (event, index, value) => this.setState({ value, typeOfWorkplace: value });

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Iveskite Varda"
                            floatingLabelText="Vardas"
                            onChange={(event, newValue) => this.setState({ firstName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Iveskite pavarde"
                            floatingLabelText="pavarde"
                            onChange={(event, newValue) => this.setState({ lastName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Darbo vieta"
                            floatingLabelText="Imones Pavadinimas"
                            onChange={(event, newValue) => this.setState({ workplace: newValue })}
                        />
                        <br />
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={"Pasirinkite Imones tipą"} primaryText={"Pasirinkite Imones tipą"} />
                            <MenuItem value={"UAB"} primaryText="UAB" />
                            <MenuItem value={"AB"} primaryText="AB" />
                            <MenuItem value={"MB"} primaryText="MB" />
                            <MenuItem value={"Všį"} primaryText="Všį" />
                        </DropDownMenu>
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Confirm Password"
                            floatingLabelText="Confirm password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default RegisterPharmasist;