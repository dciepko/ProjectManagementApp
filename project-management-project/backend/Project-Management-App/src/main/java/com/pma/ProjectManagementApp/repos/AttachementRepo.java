package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.modules.Attachement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachementRepo extends JpaRepository<Attachement, Integer> {
    //List<Activity> findByActivityAttachementAttachementID(Integer id);
    void deleteByActivity(Activity activity);
}