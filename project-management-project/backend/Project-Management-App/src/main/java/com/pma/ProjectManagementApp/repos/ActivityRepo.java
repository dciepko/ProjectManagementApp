package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Repository
public interface ActivityRepo extends JpaRepository<Activity, Integer> {
    List<Activity> findByProjectsAProjectID(Integer id);
}
