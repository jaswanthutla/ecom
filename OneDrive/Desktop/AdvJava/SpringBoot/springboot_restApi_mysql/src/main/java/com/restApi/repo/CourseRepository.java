package com.restApi.repo;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restApi.binding.Course;

public interface CourseRepository extends JpaRepository<Course,Serializable>{

}
