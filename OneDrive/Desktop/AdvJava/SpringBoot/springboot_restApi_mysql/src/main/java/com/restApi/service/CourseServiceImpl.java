package com.restApi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.restApi.binding.Course;
import com.restApi.repo.CourseRepository;
@Service
public class CourseServiceImpl implements CourseService {
	
	private CourseRepository courseRepo;

	@Override
	public String upSert(Course course) {
		
		courseRepo.save(course);
		return "Success";
	}

	@Override
	public Course getById(Integer cid) {
		Optional<Course> opt=courseRepo.findById(cid);
		if(opt.isPresent())
		{
			return opt.get();
		}
		return null;
	}

	@Override
	public List<Course> getAllCourses() {
		return courseRepo.findAll();
	}

	@Override
	public String deleteById(Integer cid) {
		if(courseRepo.existsById(cid))
		{
			courseRepo.deleteById(cid);
			return "delete success";
		}
		else
		{
			return "No record found";
		}
	}

}
