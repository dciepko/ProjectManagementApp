package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.UserDto;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepo repo;

    public List<UserDto> getUsers(){
        List<User> users = repo.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDto convertToDTO(User user) {
        UserDto userDTO = new UserDto();
        userDTO.setUserID(user.getUserID());
        userDTO.setUserName(user.getUserFirstName());
        userDTO.setUserSurename(user.getUserSurename());
        userDTO.setUserNickname(user.getUserNickname());
        userDTO.setUserEmail(user.getUserEmail());
        userDTO.setWorkingHours(user.getWorkingHours());
        userDTO.setIsOwner(user.getIsOwner());

        userDTO.setAvatarIDs(user.getAvatars().stream().map(a -> a.getAvatarID()).collect(Collectors.toList()));
        userDTO.setCommentIDs(user.getComments().stream().map(c -> c.getCommentID()).collect(Collectors.toList()));
        userDTO.setAttachementIDs(user.getAttachements().stream().map(a -> a.getAttachementID()).collect(Collectors.toList()));
        userDTO.setProjectIDs(user.getProjectsU().stream().map(p -> p.getProjectID()).collect(Collectors.toList()));
        userDTO.setActivityIDs(user.getActivitiesUser().stream().map(a -> a.getActivityID()).collect(Collectors.toList()));
        userDTO.setTeamIDs(user.getTeams().stream().map(t -> t.getTeamID()).collect(Collectors.toList()));

        return userDTO;
    }

    public void addUser(User newUser) {
        repo.save(newUser);
    }

    public void editUser(Integer id, User newUser) {
        User editedUser = repo.findById(id).get();
        if(editedUser!=null) {
            editedUser.setUserID(newUser.getUserID());
            editedUser.setUserFirstName(newUser.getUserFirstName());
            editedUser.setUserSurename(newUser.getUserSurename());
            editedUser.setUserNickname(newUser.getUserNickname());
            editedUser.setUserEmail(newUser.getUserEmail());
            editedUser.setUserPassword(newUser.getUserPassword());
            editedUser.setIsOwner(newUser.getIsOwner());
            editedUser.setWorkingHours(newUser.getWorkingHours());
            editedUser.setAvatars(newUser.getAvatars());
            editedUser.setAttachements(newUser.getAttachements());
            editedUser.setComments(newUser.getComments());
            editedUser.setProjectsU(newUser.getProjectsU());
            editedUser.setActivitiesUser(newUser.getActivitiesUser());
            editedUser.setTeams(newUser.getTeams());

            repo.save(editedUser);
        }
    }

    public void deleteUser(Integer id) {
        repo.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repo.findByUserName(username);
    }

    public void saveUser (User user) {
        repo.save(user);
    }
}