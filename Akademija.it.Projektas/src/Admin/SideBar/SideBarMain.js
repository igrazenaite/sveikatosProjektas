import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RegisterBar from './RegisterBar';
import UserList from './UserList';
import './Drawer.css'
import {Link} from 'react-router-dom'
// import DrAndPatient from '.DrAndPatient'


class SideBarMain extends Component {


    constructor(props) {
        super(props);
        this.state = {
            open: true,
            showRegisterOptions: false,
            showPatientGetDoctor: false,
            showUserManagementOptions: false,
        };
    }
    handleToggle = (toggleName) => {
        this.setState({ [toggleName]: !this.state[toggleName] });
    }

    render() {
        return (
            <div>
                <Drawer open={this.state.open}
                onRequestChange={this.state.closeAction}
                className="drawerStyles">
                
                
                    <AppBar title={<span>Meniu</span>}
                        showMenuIconButton={false} />
                    <MenuItem onClick={this.handleToggle.bind(this, "showRegisterOptions")}>Naujų vartotojų  registracija</MenuItem>
                    <Link to="/admin/assigndoctor" style={{textDecoration: 'none'}}><MenuItem>Priskirti pacientą daktarui</MenuItem></Link>
                    <MenuItem onClick={this.handleToggle.bind(this, "showUserManagementOptions")}>Vartotojų sarašas</MenuItem>
                </Drawer>
                <RegisterBar
                    open={this.state.showRegisterOptions}
                    closeAction={this.handleToggle.bind(this, 'showRegisterOptions')} 
                    />
                <UserList
                    open={this.state.showUserManagementOptions}
                    closeAction={this.handleToggle.bind(this, 'showUserManagementOptions')} />
            </div>
        );
    }
}

export default SideBarMain;