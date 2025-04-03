package ecom.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ecom.dto.Users;
import ecom.repo.UserRepository;
@Service
public class UserServiceImplementation implements UserService,UserDetailsService
{
	@Bean
	public BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	@Autowired
	private UserRepository repo;

	@Override
	public Users saveUser(Users u) 
	{
		if (repo.existsByUser(u.getUser())) {
            throw new RuntimeException("User already exists!");
        }
		else
		{
			
		String pwd=encoder().encode(u.getPassword());
		u.setPassword(pwd);
		Users user=repo.save(u);
		return user;
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    Users user = repo.findByUser(username);

	    System.out.println(" Found user: " + user.getUser());
	    System.out.println(" User Role from DB: " + user.getRole());  // Should print "ADMIN"

	    return new org.springframework.security.core.userdetails.User(
	            user.getUser(),
	            user.getPassword(),
	            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole())) // No "ROLE_" prefix
	    );
	}

	

}
