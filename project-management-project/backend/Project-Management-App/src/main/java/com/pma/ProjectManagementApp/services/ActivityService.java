package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.ActivityDto;
import com.pma.ProjectManagementApp.modules.Activity;
import com.pma.ProjectManagementApp.repos.ActivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepo activityRepo;

    public List<ActivityDto> getActivity(){
        List<Activity> activities = activityRepo.findAll();
        return activities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ActivityDto> getActivityById(Integer projectId) {
        List<Activity> activities = activityRepo.findByActivityProjectProjectID(projectId);
        return activities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void deleteActivity(Integer id)
    {
        if(!activityRepo.findById(id).isEmpty()){
            activityRepo.deleteById(id);
        }
        else {
            System.out.println("Not found");
        }
    }

    private ActivityDto convertToDTO(Activity activity) {
        ActivityDto activityDTO = new ActivityDto();
        activityDTO.setActivityID(activity.getActivityID());
        activityDTO.setActivityName(activity.getActivityName());
        activityDTO.setActivityDescription(activity.getActivityDescription());
        activityDTO.setDueDate(activity.getDueDate());
        activityDTO.setActivityType(activity.getActivityType());
        activityDTO.setActivityPriority(activity.getActivityPriority());
        activityDTO.setTableID(activity.getTableA().getTableID());
        activityDTO.setLabelID(activity.getLabelA().getLabelID());
        activityDTO.setStatusID(activity.getActivitiesStatus().getStatusID());
        activityDTO.setProjectID(activity.getActivityProject().getProjectID());
        activityDTO.setUserIDs(activity.getUsersActivity().stream()
                .map(user -> user.getUserID())
                .collect(Collectors.toList()));
        activityDTO.setCommentIDs(activity.getComments().stream()
                .map(comment -> comment.getCommentID())
                .collect(Collectors.toList()));
        activityDTO.setAttachementIDs(activity.getAttachements().stream()
                .map(attachement -> attachement.getAttachementID())
                .collect(Collectors.toList()));
        return activityDTO;
    }
}