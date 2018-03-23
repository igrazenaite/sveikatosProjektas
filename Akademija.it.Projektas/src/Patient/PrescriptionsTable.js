import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import PrescriptionInformationModal from './PrescriptionInformationModal'
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {API} from "../Admin/SideBar/Registration/HostUrl";

const styles = {
  marginLeft: 0,
  marginRight: 10

}

class PrescriptionsTable extends Component {
  constructor() {
    super();
    this.state = {
      fixedHeader: true,
      showRowHover: true,
      showCheckboxes: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      height: '300px',
      showModal: false,

      prescriptions: [],
      validUntil: '',
      prescriptionDate: '',
      doctorsFullName:'',
      timesUsed: 0,
      activeIngredient: '',
      amountPerDose:'',
      units:'',
      totalAmount:'',
      totalUnits:'',
      description: '',
    prescriptionId: '',
    doctor: {
      firstName: '',
      lastName: '',

      prescriptionInfo: []
    }
  }
}

  /*gets single prescription*/
  openModal = (prescriptionId) => {
    // console.log("number:" + prescriptionId);
    axios.get(API+"/patient/prescriptions/" + prescriptionId)
      .then((response) => {
        this.setState({ prescriptionInfo: response.data })
        this.setState({ showModal: !this.state.showModal })
      })
      .catch((error) => {
        console.log(error);

      })
  }
  /*closes prescription modal*/
  closeModal=()=>{
    this.setState({showModal: false})
  }

  /*gets all patient's prescriptions*/
    componentWillMount() {
      let userData = window.sessionStorage.getItem('userData');
      let user = JSON.parse(userData);
       axios
            .get("http://localhost:8081/patient/" + user.userId +"/prescriptions")
            .then((response) => {
              
                this.setState({prescriptions: response.data});
            })
            .catch((error) => {
                console.log(error);
            }); 
    }

  render() {

      var allPrescriptions = this.state.prescriptions.map((prescription, index) => (
        <TableRow key={index} >
            <TableRowColumn>{prescription.validUntil}</TableRowColumn>
            <TableRowColumn>{prescription.prescriptionDate}</TableRowColumn>
            {/* <TableRowColumn><FlatButton id="listOfUsesButton" label="Sąrašas" primary={true} /* onClick={()=>this.openModal(uses.number)} */ /*/>  {prescription.timesUsed}</TableRowColumn> */}
            <TableRowColumn>{prescription.activeIngredient}</TableRowColumn>
            <TableRowColumn><FlatButton id="moreButton" label="Daugiau"
             primary={true} onClick={()=>this.openModal(prescription.prescriptionId)} /></TableRowColumn>
        </TableRow>
    ))

    if (!this.state.prescriptions) {
      return null;
    }

    return (
      <MuiThemeProvider>
        <div>
          <Table
            height={this.state.height}
            style={styles}
            fixedHeader={this.state.fixedHeader}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn colSpan="4" tooltip="Receptai" style={{ textAlign: 'center' }}>
                  Receptai
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn
                  className="validUntil"
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }}
                  tooltip="Galiojimo data">Galiojimo data</TableHeaderColumn>
                <TableHeaderColumn
                  className="prescriptionDate"
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }}
                  tooltip="Išrašymo data">Išrašymo data</TableHeaderColumn>
                {/* <TableHeaderColumn
                  className="timesUsed"
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }}
                  tooltip="Recepto panaudojimų sąrašas">Recepto panaudojimų sąrašas ir skaičius</TableHeaderColumn> */}
                <TableHeaderColumn
                  className="activeIngredient"
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }}
                  tooltip="Veiklioji medžiaga">Veiklioji medžiaga</TableHeaderColumn>
                <TableHeaderColumn
                  className="informationButton"
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }}
                  tooltip="Info">Informacija</TableHeaderColumn>
              </TableRow>

            </TableHeader>

            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
            >
              {allPrescriptions}
            </TableBody>

          </Table>
          <PrescriptionInformationModal
            open={this.state.showModal}
            closeAction={this.closeModal}
            prescriptionInfo={this.state.prescriptionInfo} 
            prescriptionId={this.state.prescriptionId}/>
        </div>
      </MuiThemeProvider>
    );
  }
};
export default PrescriptionsTable;