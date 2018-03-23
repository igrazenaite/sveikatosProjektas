package lt.sveikata.prescription;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.sveikata.doctor.Doctor;
import lt.sveikata.doctor.DoctorRepository;
import lt.sveikata.patient.Patient;
import lt.sveikata.patient.PatientForClient;
import lt.sveikata.patient.PatientRepository;

@Transactional
@Service
public class PrescriptionService {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private PrescriptionRepository prescriptionRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	/* receives a list of all prescriptions from database */
	public List<PrescriptionForClient> receiveAllPrescriptions() {
		List<Prescription> prescriptionsFromDatabase = getPrescriptionRepository().findAllByOrderByPrescriptionDate();
		List<PrescriptionForClient> prescriptionsForClient = prescriptionsFromDatabase.stream().map((prescription) -> {
			PrescriptionForClient prescr = new PrescriptionForClient();
			prescr.setPrescriptionDate(prescription.getPrescriptionDate());
			prescr.setValidUntil(prescription.getValidUntil());
			prescr.setActiveIngredient(prescription.getActiveIngredient());
			prescr.setNumber(prescription.getNumber());
			prescr.setTimesUsed(prescription.getTimesUsed());
			prescr.setNumber(prescription.getNumber());
			return prescr;
		}).collect(Collectors.toList());
		return prescriptionsForClient;
	}


	/* receives info about a single prescription found by it's number */
	public Prescription receivePrescriptionInfo(long prescriptionId) {
		Prescription prescription = prescriptionRepository.findByPrescriptionId(prescriptionId);
		return prescription;
	}

	public void addPrescription(AddNewPrescription newPrescription, long personalId, long doctorId) {
		Prescription prescr = new Prescription();
		prescr.setPrescriptionDate(newPrescription.getPrescriptionDate());
		prescr.setValidUntil(newPrescription.getValidUntil());
		prescr.setActiveIngredient(newPrescription.getActiveIngredient());
		prescr.setAmountPerDose(newPrescription.getAmountPerDose());
		prescr.setUnits(newPrescription.getUnits());
		prescr.setTotalAmount(newPrescription.getTotalAmount());
		prescr.setTotalUnits(newPrescription.getTotalUnits());
		prescr.setDescription(newPrescription.getDescription());
		prescr.setTimesUsed(newPrescription.getTimesUsed());
		prescriptionRepository.save(prescr);
		Doctor doc = doctorRepository.findOneByUserId(doctorId);
		prescr.setDoctor(doc);
		Patient pat = patientRepository.findByPersonalId(personalId);
		prescr.setPatient(pat);
	}

	/* saves new information about specified prescription into database */
	public void updatePrescription(Prescription prescription, Long prescriptionId) {
		Prescription prescr = prescriptionRepository.findByPrescriptionId(prescriptionId);
		prescr.setTimesUsed(prescription.getTimesUsed() + 1);
		prescriptionRepository.save(prescr);
	}

	/*
	 * collects all information about a single prescription to be returned to client
	 */
	public PrescriptionForClient receivePrescriptionForClient(Prescription prescription) {
		PrescriptionForClient prescriptionForClient = new PrescriptionForClient();
		prescriptionForClient.setValidUntil(prescription.getValidUntil());
		prescriptionForClient.setPrescriptionDate(prescription.getPrescriptionDate());
		prescriptionForClient.setTimesUsed(prescription.getTimesUsed());
		prescriptionForClient.setActiveIngredient(prescription.getActiveIngredient());
		prescriptionForClient.setAmountPerDose(prescription.getAmountPerDose());
		prescriptionForClient.setUnits(prescription.getUnits());
		prescriptionForClient.setTotalAmount(prescription.getTotalAmount());
		prescriptionForClient.setTotalUnits(prescription.getTotalUnits());
		prescriptionForClient.setDescription(prescription.getDescription());
		prescriptionForClient.setPrescriptionId(prescription.getPrescriptionId());
		return prescriptionForClient;
	}

	// get user prescriptions
	public List<Prescription> getUserPrescriptionByUserId(Long patientId) {
		return prescriptionRepository.getPatientPrescriptionsByUserId(patientId);
	}

	// get prescription by personalId
	public List<Prescription> byPersonalId(Long personalId) {
		return prescriptionRepository.getPatientPrescriptionsById(personalId);
	}

	public PrescriptionRepository getPrescriptionRepository() {
		return prescriptionRepository;
	}

	public void setPrescriptionRepository(PrescriptionRepository prescriptionRepository) {
		this.prescriptionRepository = prescriptionRepository;
	}

	public PatientRepository getPatientRepository() {
		return patientRepository;
	}

	public void setPatientRepository(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}
}
