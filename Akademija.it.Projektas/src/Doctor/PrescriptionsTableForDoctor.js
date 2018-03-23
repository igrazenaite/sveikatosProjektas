import React, {Component} from 'react';
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
import PrescriptionInfoModal from './PrescriptionInfoModal'
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {API} from "../Admin/SideBar/Registration/HostUrl";

const rowStyle={
    margin: 0,
}

const containerStyle={
    padding: 0,
}

const styles ={
  marginLeft: 0,
  marginRight: 10,
  padding: 0
  
}

class PrescriptionsTableForDoctor extends Component {
    constructor(props) {
      super(props);
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

          patientsPrescriptions: [],    
            prescriptionId: '',       
            validUntil: '',
            prescriptionDate: '',
            timesUsed: 0,
            activeIngredient: '',
            amountPerDose:'',
            units:'',
            totalAmount:'',
            totalUnits:'',
            description: '',
            prescriptionId: '',

          prescriptionInfo:[]
      }
  }

  /*gets all patient's prescriptions*/
  componentWillMount() {
    /* let userData = window.sessionStorage.getItem('userData');
      let user = JSON.parse(userData); */
    axios
         .get(API+"/doctor/patient/prescriptions")
         .then((response) => {
             console.log(response);
             this.setState({patientsPrescriptions: response.data});
         })
         .catch((error) => {
             console.log(error);
         }); 
 }
  
  /*gets single prescription*/
  openModal = (prescriptionId) => {
      console.log("number:"+prescriptionId);
      axios.get(API+"/prescriptions/" + prescriptionId)
          .then((response) => { this.setState({ prescriptionInfo: response.data }) 
            this.setState({ showModal: !this.state.showModal })
            console.log("perscription info", this.state.prescriptionInfo)
            console.log(this.state.showModal)
          })
          .catch((error) => {
              console.log(error);     
          });     
  }

  /*closes prescription modal*/
  closeModal=()=>{
    this.setState({showModal: false})
  }
 
    render() {

      if (!this.props.patients) {   
        return null;
      }

       console.log("personal",this.state.personalCode); 
       console.log("info",this.state.prescriptionInfo); 
       console.log("number", this.state.prescriptionId)

      var allPrescriptions = this.state.patientsPrescriptions.map((prescription, index) => (
        <TableRow key={index} >
            <TableRowColumn>{prescription.validUntil}</TableRowColumn>
            <TableRowColumn>{prescription.prescriptionDate}</TableRowColumn>
            {/* <TableRowColumn><FlatButton id="listOfUsesButton" label="Sąrašas" primary={true} /* onClick={()=>this.openModal(uses.prescriptionId)} *//*/>  {prescription.timesUsed}</TableRowColumn> */}
            <TableRowColumn>{prescription.activeIngredient}</TableRowColumn>
            <TableRowColumn><FlatButton id="moreButton" label="Daugiau" primary={true} onClick={()=>this.openModal(prescription.prescriptionId)} /></TableRowColumn>
        </TableRow>
    ))

      return (
        <MuiThemeProvider>
        <div>
        <Container fluid={true} style={containerStyle}>
        <Row style={rowStyle}>
        <Col md="12">
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
                <TableHeaderColumn colSpan="4" tooltip="Receptai" style={{textAlign: 'center'}}>
                  Receptai
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn 
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }} 
                  tooltip="Galiojimo data">Galiojimo data</TableHeaderColumn>
                <TableHeaderColumn 
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }} 
                  tooltip="Išrašymo data">Išrašymo data</TableHeaderColumn>
                {/* <TableHeaderColumn 
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }} 
                  tooltip="Panaudojimų skaičius">Panaudojimų sąrašas ir skaičius</TableHeaderColumn> */}
                <TableHeaderColumn 
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }}
                  tooltip="Veiklioji medžiaga">Veiklioji medžiaga</TableHeaderColumn>
                <TableHeaderColumn 
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word"
                  }} 
                  tooltip="Informacija">Informacija</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
            >
              { allPrescriptions}
              
            </TableBody>
          </Table>
          <PrescriptionInfoModal
                        open={this.state.showModal}
                        closeAction={this.closeModal}
                        prescriptionInfo={this.state.prescriptionInfo} />
          </Col>
          </Row>
          </Container> 
        </div>
        </MuiThemeProvider>
      );
    }
  };
export default PrescriptionsTableForDoctor;