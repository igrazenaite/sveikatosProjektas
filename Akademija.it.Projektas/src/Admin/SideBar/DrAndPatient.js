import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import PatientListWithoutDoctor from './AssingDoctor/PatientListWithoutDoctor'
import DoctorListForPatient from './AssingDoctor/DoctorListForPatient';
import Confirmation from './AssingDoctor/Confirmation';
import axios from 'axios';




class DoctorAssignmentToPatient extends Component {
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
            showCheckboxes: true,
            height: '480px',
            showModal: false,
            disabled: true,
            stepIndex: 0,
            visited: [],
            patientInfromationFromList: null,
            doctorInformationFromList: null,
            open: false,
            disabled2: true,
        };
    }
    componentWillMount() {
        const { stepIndex, visited } = this.state;
        this.setState({ visited: visited.concat(stepIndex) });
    }

    componentWillUpdate(nextProps, nextState) {
        const { stepIndex, visited } = nextState;
        if (visited.indexOf(stepIndex) === -1) {
            this.setState({ visited: visited.concat(stepIndex) });
        }
    }

    patientCallback = (patientDataFromList) => {
        if (!patientDataFromList) {
            return;
        } else {
            this.setState({
                patientInfromationFromList: patientDataFromList,
                disabled2: false
            });
        }
    }

    familyDoctorCallback = (doctorDataFromList) => {
        if (!doctorDataFromList) {
            return;
        } else {
            this.setState({
                doctorInformationFromList: doctorDataFromList,
                disabled2: false
            })
        }
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        if (stepIndex < 2) {
            this.setState({
                stepIndex: stepIndex + 1,
                disabled2: true
            })
        }
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    handleRequestClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = () => {


        axios.put(`http://localhost:8081/admin/patientDoctorAssign/${this.state.patientInfromationFromList.userName}/${this.state.doctorInformationFromList.userName}`)
            .then((response) => {
                console.log("registration  successful");
                this.setState({ open: !this.state.open });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <PatientListWithoutDoctor
                    callbackFromParentPatient={this.patientCallback} />;
            case 1:
                return <DoctorListForPatient
                    callBackFromParentDoctor={this.familyDoctorCallback} />;
            case 2:
                return <Confirmation
                    patient={this.state.patientInfromationFromList}
                    doctor={this.state.doctorInformationFromList} />;
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const { stepIndex, visited } = this.state;
        const contentStyle = { margin: '0 16px' };
        console.log(this.state.disabled2)

        return (
            <MuiThemeProvider>
                <div className="doctorAssignmentToPatient" 
                     style={{ width: '100%', maxWidth: 700, margin: 'auto' }} >

                    <Stepper activeStep={stepIndex}>
                        <Step completed={visited.indexOf(0) !== -1} active={stepIndex === 0}>
                            <StepLabel>Pasirinkite</StepLabel>
                        </Step>
                        <Step completed={visited.indexOf(1) !== -1} active={stepIndex === 1}>
                            <StepLabel>Pasirinkite Daktarą</StepLabel>

                        </Step>
                        <Step completed={visited.indexOf(2) !== -1} active={stepIndex === 2}>
                            <StepLabel>Patvirtinkite</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={contentStyle}>
                        <div>{this.getStepContent(stepIndex)}</div>
                        <div style={{ marginTop: 12 }}>
                            <FlatButton
                                label="Atgal"
                                disabled={stepIndex === 0}
                                onClick={this.handlePrev}
                                style={{ marginRight: 12 }}
                            />
                            <RaisedButton
                                label={stepIndex === 2 ? 'Patvirtinti' : 'Kitas'}
                                primary={true}
                                onClick={stepIndex === 2 ? this.handleSubmit : this.handleNext}
                                disabled={stepIndex === 2 ? false : this.state.disabled2}
                            />
                            <Snackbar
                                open={this.state.open}
                                message="Gydytojas priskirtas pacientui"
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                                style={{ backgroundColor: '#ffd699' }}
                            />
                        </div>
                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}
export default DoctorAssignmentToPatient;
