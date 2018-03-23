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
import InformationModal from './DoctorInformationModal'
import FlatButton from 'material-ui/FlatButton/FlatButton';


export default class ListofDoctors extends Component {
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
            doctorGet: [],
            showModal: false,
            disabled: true
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
        axios.get(`http://localhost:8081/admin/doctor/${userName}`)
            .then((response) => { this.setState({ userInfo: response.data }) })
            .then(this.setState({ showModal: !this.state.showModal }))
    }

    closeModal = () => {
        window.sessionStorage.removeItem("userName");
        this.setState({ showModal: false});
    }

    componentWillMount = () => {
        axios.get("http://localhost:8081/admin/allDoctors")
            .then((responce) => { this.setState({ doctorGet: responce.data }); console.log(this.state.doctorGet) })
            .catch((error) => { console.log(error) });
    };

    render() {
        var adminListComponenet = this.state.doctorGet.map((doctors, index) => (
            <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{doctors.firstName + " " + doctors.lastName}</TableRowColumn>
                <TableRowColumn>{doctors.userName}</TableRowColumn>
                <TableRowColumn>{doctors.role}</TableRowColumn>
                <TableRowColumn><FlatButton label="Informacija" primary={true} onClick ={() => this.openModal(doctors.userName)} /></TableRowColumn>
            </TableRow>
        ))

        if (!this.state.doctorGet) {
            return null;
        }

        console.log(this.state.disabled)
        return (
            <MuiThemeProvider>
                <div>
                <h2> Gydytojų sąrašas </h2>
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
                        userInfo={this.state.userInfo}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}