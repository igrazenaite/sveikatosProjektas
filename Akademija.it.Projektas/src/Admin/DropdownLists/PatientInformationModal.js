import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

export default class InformationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNa : '',
            open: false,
            disabled: true,
        };
    }

    handleToggle = (event) => {
        this.setState({ disabled: !this.state.disabled })
       let userNa = window.sessionStorage.getItem("userName")
        axios.put("http://localhost:8081/user/" + userNa+"/suspend")
            .then((response) => {
            })
    }


    componentWillMount = () => {
        this.setState({ disabled: true })
    }
    translate = (suspend) => {
        if (suspend) {
            return "Taip"
        } else {
            return "Ne"
        }
    }

    render() {

        if (!this.props.userInfo) {
            return null;
        }

        const actions = [
            <FlatButton
                label="Išjunkti"
                primary={true}
                onClick={this.props.closeAction}
            />,
            <FlatButton
                label="Patvirtinti"
                primary={true}
                disabled={this.state.disabled}
                onClick={this.props.closeAction}
            />,
        ];

        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                    >

                        <div  >
                            <h3> {this.props.userInfo.firstName + " " + this.props.userInfo.lastName}</h3>
                            <span>
                                <p>{"Rolė: " + this.props.userInfo.role}</p>
                                <p>Slapyvardis: {this.props.userInfo.userName}</p>
                                <p>Gimimo data: {this.props.userInfo.dateOfBirth}</p>
                                <p>Paskirtas gydytojas: {this.props.userInfo.doctorsFullName}</p>
                                <p>Suspenduotas:  {this.translate(this.props.userInfo.suspanded)} </p>
                            </span>
                        </div>
                        <Checkbox
                            label="Suspenduoti vartotoją"
                            onCheck={this.handleToggle}
                        />
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}