import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import axios from 'axios'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';



export default class RegisterBar extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            showRegisterOptions: false,
        };
    }



    render() {

        return (
            <div>
                <Drawer
                    open={this.props.open}
                >
                    <AppBar title={<span>Register</span>}
                        iconElementLeft={<IconButton tooltip="Gryšti atgal">
                            <FontIcon className="muidocs-icon-action-home" /><ArrowBack onClick={this.props.closeAction} />
                                        </IconButton>}
                    />
                    <MenuItem>Registruoti Adminą</MenuItem>
                    <MenuItem>Registruoti Pacientą</MenuItem>
                    <MenuItem>Registruoti Daktarą</MenuItem>
                    <MenuItem>Registruoti Vaistininką</MenuItem>
                </Drawer>
            </div>
        );
    }

}