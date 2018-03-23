package lt.sveikata.prescription;

import java.io.Serializable;

import lt.sveikata.doctor.DoctorForPatient;

public class PrescriptionForClient implements Serializable {

	private Long prescriptionId;
	private String prescriptionDate;
	private String validUntil;
	private String activeIngredient;
	private String amountPerDose;
	private String units;
	private String description;
	private int timesUsed;
	private Long number;
	private int totalAmount;
	private String totalUnits;
	
	DoctorForPatient doctor;

	
	public DoctorForPatient getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorForPatient doctor) {
		this.doctor = doctor;
	}

	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	public String getPrescriptionDate() {
		return prescriptionDate;
	}

	public void setPrescriptionDate(String prescriptionDate) {
		this.prescriptionDate = prescriptionDate;
	}

	public String getValidUntil() {
		return validUntil;
	}

	public void setValidUntil(String validUntil) {
		this.validUntil = validUntil;
	}

	public String getActiveIngredient() {
		return activeIngredient;
	}

	public void setActiveIngredient(String activeIngredient) {
		this.activeIngredient = activeIngredient;
	}

	public String getAmountPerDose() {
		return amountPerDose;
	}

	public void setAmountPerDose(String amountPerDose) {
		this.amountPerDose = amountPerDose;
	}

	public String getUnits() {
		return units;
	}

	public void setUnits(String units) {
		this.units = units;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getTimesUsed() {
		return timesUsed;
	}

	public void setTimesUsed(int timesUsed) {
		this.timesUsed = timesUsed;
	}

	public Long getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

	public int getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getTotalUnits() {
		return totalUnits;
	}

	public void setTotalUnits(String totalUnits) {
		this.totalUnits = totalUnits;
	}
}
