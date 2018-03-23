import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
//import TextField from 'material-ui/TextField';
//import Search from 'material-ui/svg-icons/action/search';
import axios from 'axios'
import InformationModal from './AdminInformationModal'
import FlatButton from 'material-ui/FlatButton/FlatButton';


export default class ListofAdmins extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '480px',
            adminGet: [],
            showModal: false,
            disabled: true,
            userInfo: []
        };
    }

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };
    openModal = (userName) => {
        window.sessionStorage.setItem("userName", userName)
        axios.get(`http://localhost:8081/admin/admin/${userName}`)
            .then((response) => { this.setState({ userInfo: response.data }) })
            .then(this.setState({ showModal: !this.state.showModal }))
    }

    closeModal = () => {
        this.setState({ showModal: false});
        window.sessionStorage.removeItem("userName");
    }


    componentWillMount = () => {
        axios.get("http://localhost:8081/admin/allAdmins")
            .then((response) => { this.setState({ adminGet: response.data }); 
         })
            .catch((error) => { console.log(error) });
    };

    render() {


        var adminListComponenet = this.state.adminGet.map((admins, index) => (
            <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{admins.firstName + " " + admins.lastName}</TableRowColumn>
                <TableRowColumn>{admins.userName}</TableRowColumn>
                <TableRowColumn>{admins.role}</TableRowColumn>
                <TableRowColumn><FlatButton label="Informacija" primary={true} onClick={() => this.openModal(admins.userName)} /></TableRowColumn>
            </TableRow>
        ))

        if (!this.state.adminGet) {
            return null;
        }
        return (
            <div>
                <h2> Administratorių sąrašas </h2>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        {/* <TableRow>

                            <TableHeaderColumn colSpan="5" tooltip="Search" style={{ textAlign: 'left' }}>
                                <div>
                                    <Search style={{ color: '#9E9E9E', marginRight: '15', }} />
                                    <TextField hintText="Search" underlineShow={false} />
                                </div>
                            </TableHeaderColumn>
                        </TableRow> */}
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Vardas</TableHeaderColumn>
                            <TableHeaderColumn>Slapyvardis</TableHeaderColumn>
                            <TableHeaderColumn>Pareigos</TableHeaderColumn>
                            <TableHeaderColumn>Daugiau</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                    >
                        {adminListComponenet}

                    </TableBody>
                </Table>
                <InformationModal
                    open={this.state.showModal}
                    closeAction={this.closeModal}
                    userInfo={this.state.userInfo} />
            </div>
        );
    }
}