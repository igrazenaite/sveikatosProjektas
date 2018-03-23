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
            open: false,
           
        };
    }

    handleToggle = (event) => {
        this.setState({ disabled: !this.state.disabled })
   let userNa = window.sessionStorage.getItem("userName")
        axios.put("http://localhost:8081/user/" + userNa+"/suspend")
            .then((response) => {
            })
    }

    componentWillMount = ()=>{
        this.setState({disabled: true})
   

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
                label="Patvirtinit"
                primary={true}
                disabled={this.state.disabled}
                onClick={this.props.closeAction}
        
            />,
        ];
     
        //modal pagauna paduoda array su specifiniu userinfo per props
        let user = this.props.userInfo.map((User, index) => (
            <div key={index} >
                <h3> {User.firstName + " " + User.lastName}</h3>
                <span>
                    <p>{"Rolė: " + User.role}</p>
                    <p>Slapyvardis: {User.userName}</p>
                    <p>Specializacija: {User.specialization}</p>
                    <p>Suspenduotas:  {this.translate(User.suspanded)} </p>
                </span>
            </div>
        ));
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                    >

                     {user}
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