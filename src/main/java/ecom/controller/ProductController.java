package ecom.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import ecom.dto.Products;
import ecom.service.ProductServiceImpl;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/products")
public class ProductController 
{
	private ProductServiceImpl service;

	public ProductController(ProductServiceImpl service) {
		this.service = service;
	}

	//  Only ADMIN can save a product
	@PostMapping(value = "/saveProduct", consumes = {"multipart/form-data"})
	public ResponseEntity<?> saveProduct(@RequestParam("product") String productJson,
	                                     @RequestParam("imgFile") MultipartFile imgFile) {
	    try {
	        //  Get the logged-in user's details
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	        // Check if the user has the "ADMIN" role
	        boolean isAdmin = authentication.getAuthorities().stream()
	                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

	        if (!isAdmin) {
	            return new ResponseEntity<>("Access Denied: Only ADMIN can save products", HttpStatus.FORBIDDEN);
	        }

	        // Convert JSON to Product object
	        ObjectMapper objectMapper = new ObjectMapper();
	        Products product = objectMapper.readValue(productJson, Products.class);

	        // Save product
	        Products savedProduct = service.saveProduct(product, imgFile);
	        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}



	//  Anyone can view a product by ID
	@GetMapping("/getById/{id}")
	public ResponseEntity<?> getProduct(@PathVariable int id) {
		try {
			return new ResponseEntity<>(service.getProductById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Anyone can view all products
	@GetMapping("/getAllProducts")
	public ResponseEntity<List<Products>> getProducts() {
		return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
	}

	//Only ADMIN can update a product
	@PutMapping("/updateProduct/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable int id,
	                                           @RequestParam("product") String productJson,
	                                           @RequestParam("imgFile") MultipartFile imgFile) {
	    try {
	        //  Get the logged-in user's details
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	        // Check if the user has the "ADMIN" role
	        boolean isAdmin = authentication.getAuthorities().stream()
	                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

	        if (!isAdmin) {
	            return new ResponseEntity<>("Access Denied: Only ADMIN can update products", HttpStatus.FORBIDDEN);
	        }

	        ObjectMapper objectMapper = new ObjectMapper();
	        Products product = objectMapper.readValue(productJson, Products.class);
	        service.updateProduct(id, product, imgFile);
	        return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Update failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}

	// Only ADMIN can delete a product
	@DeleteMapping("/deleteProduct/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable int id) {
	    try {
	        // Get the logged-in user's details
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	        // Check if the user has the "ADMIN" role
	        boolean isAdmin = authentication.getAuthorities().stream()
	                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

	        if (!isAdmin) {
	            return new ResponseEntity<>("Access Denied: Only ADMIN can delete products", HttpStatus.FORBIDDEN);
	        }

	        service.deleteProduct(id);
	        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Deletion failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	// Anyone can search for products
	@GetMapping("/search")
	public ResponseEntity<List<Products>> searchResults(@RequestParam(name = "keyword") String keyword) {
		List<Products> products = service.searchProducts(keyword);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}
}
