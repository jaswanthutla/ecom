package ecom.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import ecom.dto.Products;

public interface ProductServicee
{
	Products saveProduct(Products product,MultipartFile imgFile) throws IOException;
	Products getProductById(int id);
	List<Products> getAllProducts();
	Products updateProduct(int id,Products product,MultipartFile imgFile) throws IOException;
	void deleteProduct(int id);
	List<Products> searchProducts(String products);
}
