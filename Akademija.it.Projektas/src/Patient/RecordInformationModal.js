import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class RecordInformationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    translateCompensated=(compensated)=>{
        if (compensated){
            return "Taip"
        }else{
            return "Ne"
        }
    }

    translateRepeated=(visitIsRepeated)=>{
        if(visitIsRepeated){
            return "Taip"
        }else{
            return "Ne"
        }
    }

    render() {

        if (!this.props.recordInfo){
            return null;
        }

        const actions =
            (<FlatButton
                label="Atgal"
                primary={true}
                onClick={this.props.closeAction}
            />);

        var singleRecord = (
                <div id="recordInfo">
                    <p> Apsilankymo data: {this.props.recordInfo.dateOfVisit}</p>
                    <p> Ligos TLK-10 kodas: {this.props.recordInfo.illnessTLKCode}</p>
                    <p> Gydytojas: {this.props.recordInfo.doctorsFullName}</p>
                    <p> Vizito trukmė: {this.props.recordInfo.lengthOfVisit}</p>
                    <p> {"Kompensuojamas TLK: " + this.translateCompensated(this.props.recordInfo.compensated)}</p>
                    <p> {"Pakartotinis vizitas: " + this.translateRepeated(this.props.recordInfo.visitIsRepeated)}</p>
                    <p> Aprašymas: {this.props.recordInfo.description}</p>
                </div>
            )
            
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Ligos įrašas"
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                        autoScrollBodyContent={true}
                    >
                    {singleRecord}
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }
}
export default RecordInformationModal;