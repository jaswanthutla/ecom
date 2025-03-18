package com.restApi.service;

import java.util.List;

import com.restApi.binding.Course;

public interface CourseService {
	public String upSert(Course course);
	
	public Course getById(Integer cid);
	
	public List<Course> getAllCourses();
	
	public String deleteById(Integer cid);

}
