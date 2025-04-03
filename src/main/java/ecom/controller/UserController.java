package ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecom.dto.Users;
import ecom.service.JwtService;
import ecom.service.UserServiceImplementation;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController 
{
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private UserServiceImplementation service;
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Users user)
	{
		try {
			
		Users u=service.saveUser(user);
		
		return new ResponseEntity<Users>(u,HttpStatus.CREATED);
		}
		catch(RuntimeException e)
		{
			return new ResponseEntity<>("user already exists",HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Users u) {
	    // Create authentication token using username and password
	    UsernamePasswordAuthenticationToken authToken =
	        new UsernamePasswordAuthenticationToken(u.getUser(), u.getPassword());

	    // Authenticate user
	    Authentication authentication = authManager.authenticate(authToken);

	    // Check if authentication is successful
	    if (authentication.isAuthenticated()) {
	        // Retrieve UserDetails object
	        UserDetails userDetails =service.loadUserByUsername(u.getUser());

	        // Generate JWT token using UserDetails
	        String jwtToken = jwtService.generateToken(userDetails);

	        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Authentication failed", HttpStatus.UNAUTHORIZED);
	    }
	}


}
