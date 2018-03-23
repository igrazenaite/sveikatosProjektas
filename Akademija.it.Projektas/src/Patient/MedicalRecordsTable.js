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
import RecordInformationModal from './RecordInformationModal';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {API} from "../Admin/SideBar/Registration/HostUrl";

const styles ={
  marginLeft: 0,
  marginRight: 10
  
}

class MedicalRecordsTable extends Component {
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

            medicalRecords: [],
            recordId:'',
            dateOfVisit: '',
            illnessTLKCode: '',
            lengthOfVisit:'',
            compensated: '',
            visitIsRepeated: '',
            description: '',
            doctor: {
            firstName: '',
            lastName: '',

            recordInfo: []
            }
           
        }
    }

  componentWillMount(){
    let userData = window.sessionStorage.getItem('userData');
    let user = JSON.parse(userData);
    axios
      .get("http://localhost:8081/patient/"+ user.userId + "/medicalRecords")
      .then((response) => {
        console.log(response);
        this.setState({medicalRecords: response.data});
    })
    .catch((error) => {
        console.log(error);
    }); 
  }
    
  /*gets single prescription*/
  openModal = (recordId) => {
    console.log("recordID:"+recordId);
    axios.get(API+"/patient/medicalRecords/" + recordId)
      .then((response) => { this.setState({recordInfo: response.data }) 
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
  componentWillMount(){
    let userData = window.sessionStorage.getItem('userData');
    let user = JSON.parse(userData);
    axios
      .get("http://localhost:8081/patient/"+ user.userId + "/medicalRecords")
      .then((response) => {

        console.log(response + "recodsInfo");
        this.setState({medicalRecords: response.data});
    })
    .catch((error) => {
        console.log(error);
    }); 
  }
      render() {
 
        var allMedicalRecords = this.state.medicalRecords.map((records, index) => (
          <TableRow key={index}>
              <TableRowColumn>{records.dateOfVisit}</TableRowColumn>
              <TableRowColumn>{records.illnessTLKCode}</TableRowColumn>
              <TableRowColumn>{records.doctor.firstName}</TableRowColumn> 
              <TableRowColumn>{records.doctor.lastName}</TableRowColumn> 
              <TableRowColumn><FlatButton id="moreButton" label="Daugiau" 
              primary={true} onClick={()=>this.openModal(records.recordId)}  /></TableRowColumn>
          </TableRow>
      ))

      if (!this.state.medicalRecords) {
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
                  <TableHeaderColumn colSpan="4" tooltip="Ligos įrašai" style={{textAlign: 'center'}}>
                  Ligos įrašai
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn 
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} 
                    tooltip="Vizito data">Vizito data</TableHeaderColumn>
                  <TableHeaderColumn 
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} 
                    tooltip="Ligos TLK kodas">Ligos TLK kodas</TableHeaderColumn>
                  <TableHeaderColumn 
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} 
                    tooltip="Gydytojo vardas">Gydytojo vardas</TableHeaderColumn>
                     <TableHeaderColumn 
                    style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }} 
                    tooltip="Gydytojo vardas">Gydytojo pavardė</TableHeaderColumn>
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
               { allMedicalRecords}
              </TableBody>
            </Table>
            <RecordInformationModal
                        open={this.state.showModal}
                        closeAction={this.closeModal}
                        recordInfo={this.state.recordInfo}
                        /* recordId={this.state.recordId} */ /> 
        </div>
        </MuiThemeProvider>
    );
  }
}
export default MedicalRecordsTable;