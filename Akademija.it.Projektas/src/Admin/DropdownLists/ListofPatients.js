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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Search from 'material-ui/svg-icons/action/search';
import axios from 'axios'
import InformationModal from './PatientInformationModal'
import FlatButton from 'material-ui/FlatButton/FlatButton';


export default class ListofPatients extends Component {
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
            showModal: false,
            disabled: true,
            patientGet:[]
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
        axios.get(`http://localhost:8081/admin/patient/${userName}`)
         .then((response) => { this.setState({ userInfo: response.data }) })
            .then(this.setState({ showModal: !this.state.showModal }))
    }

    closeModal = () => {
        this.setState({ showModal: false});
        window.sessionStorage.removeItem("userName");
    }

    componentWillMount = () => {
        axios.get("http://localhost:8081/admin/allPatients")
            .then((responce) => { this.setState({ patientGet: responce.data }); 
            })
            .catch((error) => { console.log(error) });
    };

    render() {
        var adminListComponenet = this.state.patientGet.map((patients, index) => (
            <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{patients.firstName + " " + patients.lastName}</TableRowColumn>
                <TableRowColumn>{patients.userName}</TableRowColumn>
                <TableRowColumn>{patients.role}</TableRowColumn>
                <TableRowColumn><FlatButton label="Informacija" primary={true} onClick ={() => this.openModal(patients.userName)} /></TableRowColumn>
            </TableRow>
        ))

        if (!this.state.patientGet) {
            return null;
        }

        console.log(this.state.disabled)
        return (
            <MuiThemeProvider>
                <div>
                <h2> Pacientų sąrašas </h2>
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
                        userInfo={this.state.userInfo}
                        closeAction={this.closeModal} />
                </div>
            </MuiThemeProvider>
        );
    }
}