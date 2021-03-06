import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import DoctorWindowNavigation from './DoctorWindowNavigation';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import axios from 'axios';

axios.defaults.withCredentials = true;

const rowStyle={
    margin: 0,
}

const containerStyle={
    padding: 0,
}

class DoctorContainer extends Component{
    constructor(){
        super();
        this.state ={
            userName: 'user',
            medicalRecords: [],
            prescriptions: [],
            open: true,
            leftDrop: false,
            anchorOrigin: { horizontal: 'left',
                          vertical: 'bottom' },
            targetOrigin:{ horizontal: 'left', 
                          vertical: 'top' },              
        }
    }

    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            leftDrop: true,
            anchorEl: event.currentTarget,
        });
    };

    logoutClick = () =>{
      
            axios.get('http://localhost:8081/logout')
                 .then((resp)=>{
                     console.log('isilogina');
                   //let user = resp.data;
                   window.sessionStorage.removeItem("userData");
                 } );
        };
    

    handleRequestClose = () => {
        this.setState({
            leftDrop: false,
        });
    };

    setAnchor = (positionElement, position) => {
        const {anchorOrigin} = this.state;
        anchorOrigin[positionElement] = position;
    
        this.setState({
          anchorOrigin: anchorOrigin,
        });
    };
    
    setTarget = (positionElement, position) => {
        const {targetOrigin} = this.state;
        targetOrigin[positionElement] = position;
    
        this.setState({
          targetOrigin: targetOrigin,
        });
    };
    
    render(){
    let userData = window.sessionStorage.getItem('userData');
    let user = JSON.parse(userData);
       if(userData==null)
            window.location.href="/#/";
       else{
           let user = JSON.parse(userData);
           if(user.role!=='DOCTOR')
                window.location.href="/#/";
       }
        return(
            <MuiThemeProvider>
            <div>
                <Container fluid={true} style={containerStyle}>
                <Row style={rowStyle}>
                <Col md="12">
                <AppBar className="helloUser"
                        showMenuIconButton={false} iconElementRight={<FlatButton
                        className="userPopoverMenu"
                        onClick={this.handleClick}
                        label={"Sveiki, " + user.userName} />
                    }>
                    <Popover
                        open={this.state.leftDrop}
                        anchorEl={this.state.anchorEl}
                        onRequestClose={this.handleRequestClose}
                    >
                            <MenuItem className="changePassword"
                                      containerElement={<Link to="/doctor/changePassword" />}
                                      primaryText="Pakeisti slaptažodį"/>   
                            <MenuItem className="logOut"
                                      containerElement={<Link to="/" />}
                                      onClick={this.logoutClick}
                                      primaryText="Atsijungti"/>
                    </Popover>
                </AppBar>
                </Col>
                </Row>
                </Container>
                <Container fluid={true} style={containerStyle}>
                <Row style={rowStyle}>
                <Col md="2">
                <Drawer open={this.state.open} width={170}>
                        <AppBar showMenuIconButton={false} >
                        </AppBar>
                    <MenuItem style={{whiteSpace: 'normal'}} 
                              primaryText="Pacientų sąrašas" 
                              containerElement={<Link to="/doctor/patientsList" />}/><br/>     
                    <MenuItem 
                              primaryText="Paieška duombazėje" 
                              containerElement={<Link to="/doctor/findPatient" />}
                              />
                </Drawer>
                </Col>
                <Col md="10">
                    <DoctorWindowNavigation/>
                </Col>
            </Row>
            </Container> 

            </div>
            </MuiThemeProvider>
        );
    }
}
export default DoctorContainer;