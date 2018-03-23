import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class PrescriptionInformationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {

        if (!this.props.prescriptionInfo){
            return null;
        }

        const actions =
            (<FlatButton
                label="Atgal"
                primary={true}
                onClick={this.props.closeAction}
            />);

            var singlePrescription = (
                <div id="prescriptionInfo">
                    <p> Galiojimo data: {this.props.prescriptionInfo.validUntil}</p>
                    <p> Išrašymo data: {this.props.prescriptionInfo.prescriptionDate}</p>
                    <p> Vaistą išrašęs gydytojas: {this.props.prescriptionInfo.doctor.lastName}</p>
                    <p> Panaudojimų skaičius: {this.props.prescriptionInfo.timesUsed}</p>                   
                    <p> Veiklioji medžiaga: {this.props.prescriptionInfo.activeIngredient}</p>
                    <p> Kiekis vienoje dozėje: {this.props.prescriptionInfo.amountPerDose} {this.props.prescriptionInfo.units}</p>
                    <p> Visas vaisto kiekis: {this.props.prescriptionInfo.totalAmount} {this.props.prescriptionInfo.totalUnits}</p>
                    <p> Aprašymas: {this.props.prescriptionInfo.description}</p>
                </div>
            )
        
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title="Receptas"
                        actions={actions}
                        modal={true}
                        open={this.props.open}
                        autoScrollBodyContent={true}
                    >
                        {singlePrescription}
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }
}
export default PrescriptionInformationModal;