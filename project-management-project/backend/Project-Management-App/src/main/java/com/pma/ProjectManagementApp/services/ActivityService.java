package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.ActivityDto;
import com.pma.ProjectManagementApp.modules.*;
import com.pma.ProjectManagementApp.repos.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepo activityRepo;
    @Autowired
    private StatusTableRepo tableRepo;

    @Autowired
    private LabelRepo labelRepo;

    @Autowired
    private StatusRepo activitiesStatusRepo;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private AttachementRepo attachementRepo;

    @Autowired
    private NotificationRepo notificationRepo;


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

    public Activity addActivity(ActivityDto activityDto){
        Activity activity = convertToActivity(activityDto);
        Activity addedActivity = activityRepo.save(activity);
        List<User> users = userRepo.findAllById(activityDto.getUserIDs());
        Project project = projectRepo.findByProjectID(activityDto.getProjectID());

        for(User user : users) {
            user.getActivitiesUser().add(activity);
            userRepo.save(user);

            Notification newNotification = new Notification();
            newNotification.setNotificationDate(activity.getDueDate());
            newNotification.setUserNotification(user);
            newNotification.setNotificationContent("Zostałeś dodany do aktywności '" + activity.getActivityName() +
                    "' w projekcie '" + project.getProjectName() + "'");
            newNotification.setIsRead(false);
            notificationRepo.save(newNotification);
        }



        return addedActivity;
    }

    public ActivityDto updateActivity(Integer activityId, ActivityDto updatedActivityDto) {
        Activity existingActivity = activityRepo.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + activityId));

        Activity updatedActivity = convertToActivity(updatedActivityDto);

        existingActivity.setActivityName(updatedActivity.getActivityName());
        existingActivity.setActivityDescription(updatedActivity.getActivityDescription());
        existingActivity.setDueDate(updatedActivity.getDueDate());
        existingActivity.setActivityType(updatedActivity.getActivityType());
        existingActivity.setTableA(updatedActivity.getTableA());
        existingActivity.setLabelA(updatedActivity.getLabelA());
        existingActivity.setActivitiesStatus(updatedActivity.getActivitiesStatus());
        existingActivity.setActivityProject(updatedActivity.getActivityProject());
        existingActivity.setUsersActivity(updatedActivity.getUsersActivity());
        existingActivity.setComments(updatedActivity.getComments());
        existingActivity.setAttachements(updatedActivity.getAttachements());

        activityRepo.save(existingActivity);

        return convertToDTO(existingActivity);
    }


    private Activity convertToActivity(ActivityDto activityDto) {
        Activity activity = new Activity();
        activity.setActivityName(activityDto.getActivityName());
        activity.setActivityDescription(activityDto.getActivityDescription());
        activity.setDueDate(activityDto.getDueDate());
        activity.setActivityType(activityDto.getActivityType());
        activity.setActivityPriority(activityDto.getActivityPriority());

        if (activityDto.getTableID() != null) {
            tableRepo.findById(activityDto.getTableID()).ifPresent(activity::setTableA);
        }


        if (activityDto.getLabelID() != null) {
            labelRepo.findById(activityDto.getLabelID()).ifPresent(activity::setLabelA);
        }


        if (activityDto.getStatusID() != null) {
            activitiesStatusRepo.findById(activityDto.getStatusID()).ifPresent(activity::setActivitiesStatus);
        }
        if (activityDto.getProjectID() != null) {
            projectRepo.findById(activityDto.getProjectID()).ifPresent(activity::setActivityProject);
        }

        if (activityDto.getUserIDs() != null) {
            List<User> users = activityDto.getUserIDs().stream()
                    .map(userRepo::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());
            activity.setUsersActivity(users);
        }

        if (activityDto.getCommentIDs() != null) {
            List<Comment> comments = activityDto.getCommentIDs().stream()
                    .map(commentRepo::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());
            activity.setComments(comments);
        }

        if (activityDto.getAttachementIDs() != null) {
            List<Attachement> attachements = activityDto.getAttachementIDs().stream()
                    .map(attachementRepo::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());
            activity.setAttachements(attachements);
        }

        return activity;
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

    @Transactional
    public void deleteActivityById(Integer activityID){
        Activity activity = activityRepo.findById(activityID).orElseThrow(()  -> new IllegalArgumentException("Activity with ID " + activityID + " does not exist"));

        StatusTable tableA = activity.getTableA();
        if (tableA != null){
            tableA.getActivitiesTab().remove(activity);
            tableRepo.save(tableA);
        }

        Label labelA = activity.getLabelA();
        if (labelA != null){
            labelA.getActivitiesLabel().remove(activity);
            labelRepo.save(labelA);
        }

        Status activitiesStatus = activity.getActivitiesStatus();
        if (activitiesStatus != null){
            activitiesStatus.getActivities().remove(activity);
            activitiesStatusRepo.save(activitiesStatus);
        }


        List<User> usersActivity = activity.getUsersActivity();
        if (usersActivity != null && !usersActivity.isEmpty()) {
            for (User user : usersActivity) {
                user.getActivitiesUser().remove(activity);
                userRepo.save(user);
            }
        }

        Project activityProject = activity.getActivityProject();
        if (activityProject != null){
            activityProject.getProjectActivities().remove(activity);
            projectRepo.save(activityProject);
        }

        commentRepo.deleteByActivityC(activity);
        attachementRepo.deleteByActivity(activity);

        System.out.println("przed usunieciem");
        activityRepo.deleteById(activityID);
    }
}