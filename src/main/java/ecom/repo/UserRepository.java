package ecom.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import ecom.dto.Users;

public interface UserRepository extends JpaRepository<Users, Long> {

	

	public Users findByUser(String user);
	boolean existsByUser(String user);
}
