package ecom.service;

import java.io.IOException;
import java.nio.channels.MulticastChannel;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ecom.dto.Products;
import ecom.exception.ResourceNotFoundException;
import ecom.repo.ProductRepository;
@Service
public class ProductServiceImpl implements ProductServicee {

	private ProductRepository repo;
	
	public ProductServiceImpl(ProductRepository repo) {
		super();
		this.repo = repo;
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public Products saveProduct(Products product,MultipartFile imgFile) throws IOException 
	{
			product.setImgName(imgFile.getOriginalFilename());
			product.setImgType(imgFile.getContentType());
			product.setImageData(imgFile.getBytes());
			Products p=repo.save(product);
			return p;
			
	}

	@Override
	public Products getProductById(int id) {
		System.out.println("id exists");
		return repo.findById(id).orElseThrow(()->new ResourceNotFoundException("given resource is not found"+id));
	}

	@Override
	public List<Products> getAllProducts() {
		return repo.findAll();
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public Products updateProduct(int id, Products product,MultipartFile imgFile) throws IOException {
		Products product1=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("given id is not found"+id));
		product1.setImageData(imgFile.getBytes());
		product1.setImgName(imgFile.getOriginalFilename());
		product1.setImgType(imgFile.getContentType());
		product1.setBrand(product.getBrand());
		product1.setCategory(product.getCategory());
		product1.setDescription(product.getDescription());
		product1.setName(product.getName());
		product1.setPrice(product.getPrice());
		product1.setQuantity(product.getQuantity());
		product1.setReleaseDate(product.getReleaseDate());
		repo.save(product1);
		return product1;
	}

	@Override
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteProduct(int id) {
		repo.findById(id).orElseThrow(()->new ResourceNotFoundException("given resource is not found"+id));
		repo.deleteById(id);
		
	}

	@Override
	public List<Products> searchProducts(String products) {
		List<Products> list=repo.searchProducts(products);
		return list;
	}



	

}
