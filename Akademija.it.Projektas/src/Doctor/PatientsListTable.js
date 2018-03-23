import React, {Component} from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Search from 'material-ui/svg-icons/action/search';
//import TextField from 'material-ui/TextField';
import NewPrescription from './NewPrescription';
import NewMedicalRecord from './NewMedicalRecord';

const styles ={
  marginLeft: 0,
  marginRight: 10
  
}

/* let userData = window.sessionStorage.getItem('userData');
let user = JSON.parse(userData); */

class PatientsListTable extends Component {
    constructor(){
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

            patients: [],
            firstName: '',
            lastName: '',
            patientId: '',
            routeToComponent: '',
            value: ''
        }
    }

    /*received all doctor's patients from database */
   
    componentWillMount(){
      let userData = window.sessionStorage.getItem('userData');
      let user = JSON.parse(userData);
        axios
            .get("http://localhost:8081/doctor/patientsList/" + user.userId)
            .then((response) => {
                console.log(response);
                this.setState({patients: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    } 

    /* sets a route value to a selected one */
    handleChange= (event, index, value) => {
      let patientID = event.target.getAttribute('data-patient-id')
      this.setState({value: event.target.value }) 
      this.setState({patientId:patientID});
       switch (event.target.value){
        case "naujas receptas":
          this.openPrescriptionModal();
          break;
        case "naujas ligos įrašas":
          this.openMedicalRecordModal();
          break;
        case "receptai":
          window.location.assign("http://localhost:8081/#/doctor/patient/prescriptions/");
          break;
        case "ligos įrašai":
          window.location.assign("http://localhost:8081/#/doctor/patient/medicalRecords/");
          break;
        default: return null;
      } 
    };

    /* gets a personal code value when enter key is hit */
    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          this.setState({
              personalId: e.target.value,
          });
      }
    };

    /* opens a prescription form */
    openPrescriptionModal = () => {
      
      this.setState({ showModal: !this.state.showModal });
      
    };

    /* opens a medical record form */
    openMedicalRecordModal = () => {
      this.setState({ showModal: !this.state.showModal });
    };

      render() {


        var allPatients = this.state.patients.map((patient, index) => (          
          <TableRow key={index}>
              <TableRowColumn>{patient.firstName}</TableRowColumn>
              <TableRowColumn>{patient.lastName}</TableRowColumn>
              <TableRowColumn>{patient.personalId}</TableRowColumn>
              <TableRowColumn>
                <select className="routeToComponent" 
                        value={this.state.value} data-patient-id={patient.personalId}
                         onChange={this.handleChange}>
                  <option id="moreOptions" value={""} >Daugiau informacijos </option>
                  <option id="prescriptions" value={"receptai"} >Receptai</option>
                  <option id="medicalRecords" value={"ligos įrašai"} >Ligos įrašai</option>
                  <option id="newMedicalRecord" value={"naujas ligos įrašas"} >Naujas ligos įrašas</option>
                  <option id="newPrescription" value={"naujas receptas"} >Naujas receptas</option>
                </select>
              </TableRowColumn>
          </TableRow>
      ))
 

      if (!this.state.patients) {
          return null;
      }

      /* picks which form to open, depending on value selected from dropdown */
      var newAdditionModal;
        if (this.state.value==="naujas receptas"){
            newAdditionModal=<NewPrescription 
                               
                                open={this.state.showModal}
                                closeAction={this.openPrescriptionModal}
                                personalId={this.state.patientId}
                                //perduoti ID
                                />
        }else if(this.state.value==="naujas ligos įrašas"){
            newAdditionModal=<NewMedicalRecord
                                open={this.state.showModal}
                                closeAction={this.openMedicalRecordModal}
                                personalId={this.state.patientId}/>
        }

        return (
        <MuiThemeProvider>
          <div>
            {/* <div>
              <Search style={{ color: '#9E9E9E', textAlign: 'left', marginRight: '25', marginTop: '25'}} />
              <TextField hintText="Pacientų paieška" underlineShow={true} onKeyPress={this.handleKeyPress}/>
            </div> */}
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
                  <TableHeaderColumn colSpan="4" tooltip="Pacientai" style={{textAlign: 'center'}}>
                  Pacientai
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn 
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} 
                    tooltip="Vardas">Vardas</TableHeaderColumn>
                  <TableHeaderColumn 
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} 
                    tooltip="Pavardė">Pavardė</TableHeaderColumn>
                  <TableHeaderColumn 
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} 
                    tooltip="Asmens kodas">Asmens kodas</TableHeaderColumn>
                  <TableHeaderColumn 
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
               { allPatients}
              </TableBody>
            </Table> 
            {newAdditionModal}
        </div>
        </MuiThemeProvider>
    );
  }
}
export default PatientsListTable;