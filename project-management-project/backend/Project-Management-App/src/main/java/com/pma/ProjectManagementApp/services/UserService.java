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

/**
 * Service class that handles business logic related to users.
 */
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo repo;

    /**
     * Retrieves all users.
     *
     * @return List of all users
     */
    public List<UserDto> getUsers(){
        List<User> users = repo.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Converts a User entity to UserDto.
     *
     * @param user User entity to convert
     * @return UserDto representation of the user
     */
    public UserDto convertToDTO(User user) {
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

    /**
     * Adds a new user.
     *
     * @param newUser User object to be added
     */
    public void addUser(User newUser) {
        repo.save(newUser);
    }

    /**
     * Edits an existing user.
     *
     * @param id ID of the user to edit
     * @param newUser Updated User object
     */
    public void editUser(Integer id, User newUser) {
        User editedUser = repo.findById(id).get();
        if(editedUser != null) {
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

    /**
     * Deletes a user by ID.
     *
     * @param id ID of the user to delete
     */
    public void deleteUser(Integer id) {
        repo.deleteById(id);
    }

    /**
     * Loads a user by username (nickname).
     *
     * @param username Username (nickname) of the user
     * @return UserDetails object representing the user
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repo.findByUserNickname(username);
    }

    /**
     * Saves a user.
     *
     * @param user User object to save
     */
    public void saveUser(User user) {
        repo.save(user);
    }
}
