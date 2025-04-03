package ecom.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import ecom.filter.AppFilter;
import ecom.service.UserServiceImplementation;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AppFilter appFilter;

    @Autowired
    private UserServiceImplementation userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())  // Disable CSRF as JWT is used
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user/save", "/user/login").permitAll()  // Public endpoints
                        .requestMatchers("/products/getAllProducts", "/products/getById/**", "/products/search")
                            .authenticated()  // Only logged-in users can view products
                        .requestMatchers("/products/saveProduct", "/products/updateProduct/**", "/products/deleteProduct/**")
                            .hasAuthority("ROLE_ADMIN")  // Only ADMIN can manage products
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(appFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder);
        authProvider.setUserDetailsService(userService);
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
