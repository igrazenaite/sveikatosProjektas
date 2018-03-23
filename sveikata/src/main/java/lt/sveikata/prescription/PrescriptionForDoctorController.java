package lt.sveikata.prescription;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/doctor")
@CrossOrigin(origins = "*")
@Transactional
public class PrescriptionForDoctorController {
	@Autowired
	private PrescriptionService prescriptionService;

	/* gets all specified patient's prescriptions for doctor */
	@RequestMapping(value = "/patient/prescriptions", method = RequestMethod.GET)
	@PreAuthorize("hasRole('DOCTOR')")
	public List<Prescription> giveAllPrescriptions(@PathVariable ("patientId") Long patientId) {
		return getPrescriptionService().getUserPrescriptionByUserId(patientId);
	}

	/* gets a specified prescription from database, searches by number */
	@RequestMapping(value = "/prescriptions/{prescriptionId}", method = RequestMethod.GET)
	@PreAuthorize("hasRole('DOCTOR')")
	public Prescription singlePrescription(@PathVariable Long prescriptionId) {
		return prescriptionService.receivePrescriptionInfo(prescriptionId);
	}

	/* adds a new prescription to database */
	@RequestMapping(value = "{doctorId}/patient/{personalId}/addNewPrescription", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	// @PreAuthorize("hasRole('DOCTOR')")
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody void createPrescrition(@RequestBody final AddNewPrescription newPrescription,
			@PathVariable Long personalId, @PathVariable Long doctorId) {
		prescriptionService.addPrescription(newPrescription, personalId, doctorId);
	}

	public PrescriptionService getPrescriptionService() {
		return prescriptionService;
	}

	public void setPrescriptionService(PrescriptionService prescriptionService) {
		this.prescriptionService = prescriptionService;
	}
}
