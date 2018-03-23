package lt.sveikata.prescription;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.sveikata.patient.Patient;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long>{

	
	List<Prescription> findAllByOrderByPrescriptionDate();

	
	//List<Prescription> findByPersonalId(long personalId);
	
	Prescription findByPrescriptionId(long prescriptionId);
	
	//find by userId
	@Query("SELECT prescription FROM Prescription prescription JOIN prescription.patient patient WHERE patient.userId = :patId")
	List<Prescription> getPatientPrescriptionsByUserId(@Param("patId") Long id);
	

	@Query("SELECT prescription FROM Prescription prescription JOIN prescription.patient patient WHERE patient.personalId = :presId")
	List<Prescription> getPatientPrescriptionsById(@Param("presId") Long id);
	

	
}
