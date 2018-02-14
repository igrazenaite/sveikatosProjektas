package lt.sveikata.doctor;

import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lt.sveikata.medicalRecords.Record;
import lt.sveikata.patient.Patient;
import lt.sveikata.prescription.Prescription;
import lt.sveikata.user.User;

@Entity
@Table(name = "DOCTOR")
@PrimaryKeyJoinColumn(name = "doctorId")
public class Doctor  extends User{




	private String firstName;
	@NotNull
	private String lastName;
	private String specialization;

	
	@OneToMany(mappedBy="doctor")
	private Set<Record> records;
	
	@OneToMany(mappedBy="doctor")
	private Set<Prescription> prescriptions;
	
	@OneToMany(mappedBy="doctor")
	private Set<Patient>patients;


   public void addPatient(Patient patient) {
	   this.patients.add(patient);
	   patient.setDoctor(this);
   }
   /*patient lenteleje bus doctor stulpelis - isorinis raktas i doctor.
    * Patient yra savininkas,todel kiekviena karta pridedat nauja pascienta, 
    * turi buti susiejamas gydytojas, kvieciant savininko metoda setDoctor();
    */
	
   
	public String getFirstName() {
		return firstName;
	}

	public Set<Record> getRecords() {
		return records;
	}


	public void setRecords(Set<Record> records) {
		this.records = records;
	}


	public Set<Prescription> getPrescriptions() {
		return prescriptions;
	}


	public void setPrescriptions(Set<Prescription> prescriptions) {
		this.prescriptions = prescriptions;
	}


	public Set<Patient> getPatients() {
		return patients;
	}


	public void setPatients(Set<Patient> patients) {
		this.patients = patients;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

}
