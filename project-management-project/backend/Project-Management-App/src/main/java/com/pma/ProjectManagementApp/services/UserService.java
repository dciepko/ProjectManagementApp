package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepo repo;

    public List<User> getUsers(){
        return repo.findAll();
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