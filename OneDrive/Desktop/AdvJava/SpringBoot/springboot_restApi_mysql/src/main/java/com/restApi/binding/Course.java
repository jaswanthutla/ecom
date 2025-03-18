package com.restApi.binding
;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Course 
{
	@Id
	private Integer id;
	private String name;
	private Double price;
	

}
