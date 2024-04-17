package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.repos.ActivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepo activityRepo;

    public List<Activity> getActivity(){
        return activityRepo.findAll();
    }

    public void deleteAutor(Integer id)
    {
        if(!activityRepo.findById(id).isEmpty()){
            activityRepo.deleteById(id);
        }
        else {
            System.out.println("Not found");
        }
    }
}