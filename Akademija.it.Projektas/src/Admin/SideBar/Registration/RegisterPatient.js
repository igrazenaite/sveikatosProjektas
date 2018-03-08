import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { orange500, blue500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { API } from "./HostUrl";
import axios from 'axios';

const textStyles = {
  errorStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

class RegisterPatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      repeatedPassword: '',
      dateOfBirth: '',
      personalId: '',
      doctorsFullName: '',
      firstDigit: '',
      secondGroup: '',
      year: '',
      month: '',
      day: '',
      disabled: true


    };
  }
  validFirstNameEntered() {
    if (this.state.firstName !== '' &&
      this.state.firstName.length >= 3 &&
      this.state.firstName.length <= 30) {
      return true;
    }
    else {
      alert("Vardo laukelis privalomas! Patikrinkite, ar įvedėte teisingai.")
    }
  }

  validLastNameEntered() {
    if (this.state.lastName !== '' &&
      this.state.lastName.length >= 3 &&
      this.state.lastName.length <= 30) {
      return true;
    }
    else {
      alert("Pavardės laukelis privalomas! Patikrinkite, ar įvedėte teisingai.")
    }
  }

  validUserNameEntered() {
    if (this.state.userName !== '' &&
      this.state.userName.length >= 6 &&
      this.state.userName.length <= 30) {
      return true;
    }
    else {
      alert("Prisijungimo vardas privalomas! Patikrinkite, ar įvedėte teisingai.")
    }
  }

  getPersonalId = (event, newValue) => {
    if (newValue === '') {
      this.setState({ disabled: true })
    }
    this.personalId = this.setState({
      personalId: newValue,
      disabled: false
    });
    console.log('get id', this.state.personalId)
  }



  validPersonalIdEntered() {
    var reg = new RegExp(/(\d{11})/)
    var match = reg.exec(this.state.personalId);
    if (this.state.personalId !== '' &&
      match !== null) {
      return true;
    }
    else {
      alert("Asmens kodas privalomas! Asmens kodą sudaro 11 skaitmenų")
    }
  }

  bothPasswordsMatch() {
    if (this.state.password === this.state.repeatedPassword) {
      return true;
    }
    else {
      alert("Slaptažodis nesutampa su pakartotu slaptažodžiu! Bandykite įvesti iš naujo.");
    }
  }

  validPassword() {
    if (this.state.password.length >= 6 &&
      this.state.password.length <= 30) {
      return true;
    }
    else {
      alert("Slaptažodis privalomas! Slaptažodis turi būti nuo 6 iki 30 simbolių.")
    }
  }
  generateDateOfBirth = () => {
    var personalCodeString = this.state.personalId
    var reg = new RegExp(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{4})/);
    var match = reg.exec(personalCodeString)

    const firstDigit = match[1];
    const secondGroup = match[2];
    const month = match[3];
    const day = match[4];

    let year = null;
    if ((firstDigit === '3') || (firstDigit === '4')) {
      year = '19' + secondGroup;
    } else {
      year = '20' + secondGroup;
    }

    let newDateOfBirth = new Date(year + '-' + month + '-' + day).toLocaleDateString('lt-LT');
    this.setState({ dateOfBirth: newDateOfBirth });
  }

  handleDateGeneration(event) {
    this.setState({ dateOfBirth: '' })
    this.generateDateOfBirth();
    event.preventDefault();
  }

  dateOfBirthIsGenerated() {
    if (this.state.dateOfBirth !== null && this.state.dateOfBirth !== '' &&
      this.validPersonalIdEntered && this.state.dateOfBirth !== 'Invalid Date') {
      return true;
    } else {
      alert('Paspauskite mygtuką "Generuoti gimimo datą arba suveskite teisingą asmens kodą')
    }
  }

  dataIsValid() {
    if (this.validPersonalIdEntered() &&
      this.bothPasswordsMatch() &&
      this.validFirstNameEntered() &&
      this.validLastNameEntered() &&
      this.validUserNameEntered() &&
      this.validPassword() &&
      this.dateOfBirthIsGenerated()) {
      return true;
    }
  }


  handleClick(event) {
    var apiUrl = API;

    if (this.dataIsValid()) {
      console.log("data is valid: " + this.dataIsValid());

      //set values
      var information = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        password: this.state.password,
        dateOfBirth: this.state.dateOfBirth,
        personalId: this.state.personalId,
      }
      this.refs.form.reset();
      this.setState({ dateOfBirth: '' })

      console.log('info', information)
      axios.post(apiUrl + '/admin/patient', information)
        .then((response) => {
          console.log("registration  successful");
          alert("Registracija sėkminga!");
        })
        .catch((error) => {
          console.log(error);
        })
      console.log(this.state);
      event.preventDefault();
      return true;
    } else {
      this.setState({ dateOfBirth: '' })
      console.log("some data is wrong");
      return false;
    }
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <form className="registerPatient"
            ref="form">
            <h2> Registruoti pacientą </h2>
            <TextField
              className="firstName"
              id="inputFirstName"
              hintText="Nuo 3 iki 30 simbolių"
              errorText="Privalomas laukas"
              errorStyle={textStyles.errorStyle}
              floatingLabelText="Vardas"
              floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
              onChange={(event, newValue) => this.setState({ firstName: newValue })}
            />
            <br />
            <TextField
              className="lastName"
              id="inputLastName"
              hintText="Nuo 3 iki 30 simbolių"
              errorText="Privalomas laukas"
              errorStyle={textStyles.errorStyle}
              floatingLabelText="Pavardė"
              floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
              onChange={(event, newValue) => this.setState({ lastName: newValue })}
            />
            <br />
            <TextField
              className="personalCode"
              id="inputPersonalCode"
              hintText="Asmens kodą sudaro 11 skaitmenų"
              errorText="Privalomas laukas"
              errorStyle={textStyles.errorStyle}
              type="numbers"
              floatingLabelText="Asmens kodas"
              floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
              onChange={this.getPersonalId}
            />
            <br />
            {/*fix this*/}
            <TextField
              className="dateOfBirth"
              id="autoInputDateOfBirth"
              disabled={true}
              hintText="Gimimo data"
              type="numbers"
              floatingLabelText={this.state.dateOfBirth}
              floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
            //onChange={(event, dateOfBirth) =>this.setState({floatingLabelText: dateOfBirth})}  
            />
            <RaisedButton
              label="Generuoti gimimo datą"
              onClick={(event) => this.handleDateGeneration(event)}
              disabled={this.state.disabled} />
            <br />
            <TextField
              className="userName"
              id="inputUserName"
              hintText="Nuo 6 iki 30 simbolių"
              errorText="Privalomas laukas"
              errorStyle={textStyles.errorStyle}
              floatingLabelText="Prisijungimo vardas"
              floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
              onChange={(event, newValue) => this.setState({ userName: newValue })}
            />
            <br />
            <TextField
              className="password"
              id="inputPassword"
              type="password"
              hintText="Nuo 6 iki 30 simbolių"
              errorText="Privalomas laukas"
              errorStyle={textStyles.errorStyle}
              floatingLabelText="Slaptažodis"
              floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <TextField
              className="repeatedPassword"
              id="inputRepeatedPassword"
              type="password"
              hintText="Nuo 6 iki 30 simbolių"
              errorText="Privalomas laukas"
              errorStyle={textStyles.errorStyle}
              floatingLabelText="Pakartokite slaptažodį"
              floatingLabelFocusStyle={textStyles.floatingLabelFocusStyle}
              onChange={(event, newValue) => this.setState({ repeatedPassword: newValue })}
            />
            <br />
            <RaisedButton className="submitButton" id="submitForm" label="Registruoti" primary={true} onClick={(event) => this.handleClick(event)} />
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default RegisterPatient;