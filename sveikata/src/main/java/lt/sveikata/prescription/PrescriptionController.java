package lt.sveikata.prescription;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/patient")
@CrossOrigin(origins="*")
public class PrescriptionController {

	@Autowired
	private PrescriptionService prescriptionService;
	

	private ModelMapper modelMapper = new ModelMapper();

	/*gets  all user prescriptions from database*/
	@RequestMapping(value = "/{patientId}/prescriptions", method = RequestMethod.GET)
	@PreAuthorize("hasRole('PATIENT')") 
	public List<PrescriptionForClient> getPatientPrescriptions(@PathVariable("patientId") Long patientId) {
		List<Prescription> prescriptions = prescriptionService.getUserPrescriptionByUserId(patientId);
		return modelMapper.map(prescriptions, new TypeToken<List<PrescriptionForClient>>() {
		}.getType());

	}
	
	/*gets a specified prescription from database, searches by number*/
	@RequestMapping(value = "/prescriptions/{prescriptionId}", method = RequestMethod.GET)
	//	@PreAuthorize("hasRole('PATIENT')") 
	public PrescriptionForClient singlePrescription(@PathVariable("prescriptionId") final Long prescriptionId) {
		//long number = Long.parseLong(Strnumber);
		Prescription presc = prescriptionService.receivePrescriptionInfo(prescriptionId);
		return modelMapper.map(presc, PrescriptionForClient.class);

	}


	/*will be used to mark a prescription as used or invalid. doesn't work yet*/
	@RequestMapping(value = "/prescriptions/{number}", method = RequestMethod.PUT)
	//	@PreAuthorize("hasRole('PATIENT')")  
	@ResponseStatus(HttpStatus.CREATED)
	public void updateExistingPrescription(@RequestBody final Prescription prescription,
			@PathVariable final Long number) {
		prescriptionService.updatePrescription(prescription, number);
	}

	public PrescriptionService getPrescriptionService() {
		return prescriptionService;
	}

	public void setPrescriptionService(PrescriptionService prescriptionService) {
		this.prescriptionService = prescriptionService;
	}
}
