package ecom.dto;

import java.sql.Date;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Products 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	@Column(name="descr")
	private String description;
	private String brand;
	private double price;
	private String category;
	@JsonFormat(pattern = "dd-MM-yyyy") // Specify the custom date format
	private Date releaseDate;
	private int quantity;
	private String imgName;
	private String imgType;
	@Lob
	private byte[] imageData;
	 

}
