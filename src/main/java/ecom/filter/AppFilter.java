package ecom.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import ecom.service.JwtService;
import ecom.service.UserServiceImplementation;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class AppFilter extends OncePerRequestFilter
{
	@Autowired
	private JwtService jwtServ;
	@Autowired
	private UserServiceImplementation userService;
	@Override
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token=null; 
		String username=null;
		String header=request.getHeader("Authorization");
		
		if(header!=null && header.startsWith("Bearer "))
		{
			token=header.substring(7);
			username=jwtServ.extractUsername(token);
		}
		
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		{
			UserDetails userDetials=userService.loadUserByUsername(username);
			Boolean isvalid= jwtServ.validateToken(token, userDetials);
			if(isvalid)
			{
				UsernamePasswordAuthenticationToken authToken=
						new UsernamePasswordAuthenticationToken(userDetials,null,userDetials.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
			
		}
		
		filterChain.doFilter(request,response);
		
	}

}
