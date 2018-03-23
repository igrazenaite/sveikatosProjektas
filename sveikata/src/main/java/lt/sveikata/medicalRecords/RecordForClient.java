package lt.sveikata.medicalRecords;

import lt.sveikata.doctor.DoctorForClient;
import lt.sveikata.doctor.DoctorForPatient;

//import java.time.LocalDate;

public class RecordForClient {

	private long recordId;
	private String dateOfVisit;
	private String illnessTLKCode;
	private String doctorsFullName;
	private int lengthOfVisit;
	private String description;
	private boolean isCompensated;
	private boolean visitIsRepeated;


	private DoctorForPatient doctor;

	public String getDateOfVisit() {
		return dateOfVisit;
	}

	public void setDateOfVisit(String dateOfVisit) {
		this.dateOfVisit = dateOfVisit;
	}

	public DoctorForPatient getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorForPatient doctor) {
		this.doctor = doctor;
	}

	public String getIllnessTLKCode() {
		return illnessTLKCode;
	}

	public void setIllnessTLKCode(String illnessTLKCode) {
		this.illnessTLKCode = illnessTLKCode;
	}

	public String getDoctorsFullName() {
		return doctorsFullName;
	}

	public void setDoctorsFullName(String doctorsFullName) {
		this.doctorsFullName = doctorsFullName;
	}

	public int getLengthOfVisit() {
		return lengthOfVisit;
	}

	public void setLengthOfVisit(int lengthOfVisit) {
		this.lengthOfVisit = lengthOfVisit;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isCompensated() {
		return isCompensated;
	}

	public void setCompensated(boolean isCompensated) {
		this.isCompensated = isCompensated;
	}

	public boolean isVisitIsRepeated() {
		return visitIsRepeated;
	}

	public void setVisitIsRepeated(boolean visitIsRepeated) {
		this.visitIsRepeated = visitIsRepeated;
	}

	public long getRecordId() {
		return recordId;
	}

	public void setRecordId(long recordId) {
		this.recordId = recordId;
	}

}
