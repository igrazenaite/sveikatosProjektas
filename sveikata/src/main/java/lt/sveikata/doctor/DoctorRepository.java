package lt.sveikata.doctor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long>{
    List<Doctor> findByUserName(String userName);
}
