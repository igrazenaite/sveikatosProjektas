package lt.sveikata.prescription;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PrescriptionService {

	@Autowired
	private PrescriptionRepository prescriptionRepository;

	/* receives a list of all prescriptions from database */
	public List<PrescriptionForClient> receiveAllPrescriptions() {
		List<Prescription> prescriptionsFromDatabase = getPrescriptionRepository().findAll();
		List<PrescriptionForClient> prescriptionsForClient = prescriptionsFromDatabase.stream().map((prescription) -> {
			PrescriptionForClient prescr = new PrescriptionForClient();
			// prescr.setDoctorsFullName(prescription.getDoctorsFullName());
			prescr.setPrescriptionDate(prescription.getPrescriptionDate());
			prescr.setPatientsPersonalCode(prescription.getPatientsPersonalCode());
			prescr.setValidUntil(prescription.getValidUntil());
			prescr.setActiveIngredient(prescription.getActiveIngredient());
			prescr.setAmountPerDose(prescription.getAmountPerDose());
			prescr.setUnits(prescription.getUnits());
			prescr.setDescription(prescription.getDescription());
			prescr.setNumber(prescription.getNumber());
			prescr.setTimesUsed(prescription.getTimesUsed());
			return prescr;
		}).collect(Collectors.toList());
		return prescriptionsForClient;
	}

	/* receives a list of all prescriptions from database */
	public List<PrescriptionForClient> receiveAllPrescriptionsForPharmacist() {
		List<Prescription> prescriptionsFromDatabase = getPrescriptionRepository().findAll();
		List<PrescriptionForClient> prescriptionsForClientPharmacist = prescriptionsFromDatabase.stream().map((prescription) -> {
			PrescriptionForClient prescr = new PrescriptionForClient();
			// prescr.setDoctorsFullName(prescription.getDoctorsFullName());
			prescr.setPrescriptionDate(prescription.getPrescriptionDate());
			prescr.setPatientsPersonalCode(prescription.getPatientsPersonalCode());
			prescr.setValidUntil(prescription.getValidUntil());
			prescr.setActiveIngredient(prescription.getActiveIngredient());
			prescr.setAmountPerDose(prescription.getAmountPerDose());
			prescr.setUnits(prescription.getUnits());
			prescr.setDescription(prescription.getDescription());
			prescr.setNumber(prescription.getNumber());
			prescr.setTimesUsed(prescription.getTimesUsed());
			return prescr;
		}).collect(Collectors.toList());
		return prescriptionsForClientPharmacist;
	}
	
	/* receives info about a single prescription found by it's number */
	public Prescription receivePrescriptionInfo(long number) {
		// PrescriptionForClient prescription =
		// prescriptionRepository.findPrescriptionByNumber(number);
		Prescription prescription = prescriptionRepository.findByNumber(number);
		return prescription;
	}

	/*saves all information about a new prescription into database*/
	public void addNewPrescription(AddNewPrescription newPrescription) {
		Prescription prescr = new Prescription();
		// prescr.setDoctorsFullName(newPrescription.getDoctorsFullName());
		prescr.setPrescriptionDate(newPrescription.getPrescriptionDate());
		prescr.setPatientsPersonalCode(newPrescription.getPatientsPersonalCode());
		prescr.setValidUntil(newPrescription.getValidUntil());
		prescr.setActiveIngredient(newPrescription.getActiveIngredient());
		prescr.setAmountPerDose(newPrescription.getAmountPerDose());
		prescr.setUnits(newPrescription.getUnits());
		prescr.setDescription(newPrescription.getDescription());
		prescr.setNumber(newPrescription.getNumber() + 1);
		prescr.setTimesUsed(newPrescription.getTimesUsed());
		prescriptionRepository.save(prescr);
	}

	/*saves new information about specified prescription into database*/
	public void updatePrescription(Prescription prescription, Long number) {
		Prescription prescr = prescriptionRepository.findOne(number);
		prescr.setTimesUsed(prescription.getTimesUsed() + 1);
		// prescr.setNameOfHealthInstitution(prescription.getNameOfHealthInstitution());
		// prescr.setDoctorsFullName(prescription.getDoctorsFullName());
		// prescr.setPrescriptionDate(prescription.getPrescriptionDate());
		// prescr.setPatientsName(prescription.getPatientsName());
		// prescr.setPatientsPersonalCode(prescription.getPatientsPersonalCode());
		// prescr.setValidUntil(prescription.getValidUntil());
		// prescr.setActiveIngredient(prescription.getActiveIngredient());
		// prescr.setAmountPerDose(prescription.getAmountPerDose());
		// prescr.setUnits(prescription.getUnits());
		// prescr.setDescription(prescription.getDescription());
		prescriptionRepository.save(prescr);
	}

	/*collects all information about a single prescription to be returned to client*/
	public PrescriptionForClient receivePrescriptionForClient(Prescription prescription) {
		PrescriptionForClient prescriptionForClient = new PrescriptionForClient();
		prescriptionForClient.setValidUntil(prescription.getValidUntil());
		prescriptionForClient.setPrescriptionDate(prescription.getPrescriptionDate());
		// prescriptionForClient.setDoctorsFullName(prescription.getDoctorsFullName());
		prescriptionForClient.setTimesUsed(prescription.getTimesUsed());
		prescriptionForClient.setActiveIngredient(prescription.getActiveIngredient());
		prescriptionForClient.setDescription(prescription.getDescription());
		return prescriptionForClient;
	}

	public PrescriptionRepository getPrescriptionRepository() {
		return prescriptionRepository;
	}

	public void setPrescriptionRepository(PrescriptionRepository prescriptionRepository) {
		this.prescriptionRepository = prescriptionRepository;
	}
}
