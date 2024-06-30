package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.UserDto;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling User related HTTP requests.
 */
@RestController
public class UserController {
    @Autowired
    private UserService service;

    /**
     * Retrieves all users.
     *
     * @return List of UserDto objects representing all users.
     */
    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return service.getUsers();
    }

    /**
     * Adds a new user.
     *
     * @param newUser User object containing details of the new user.
     */
    @PostMapping("/users")
    public void addUser(@RequestBody User newUser) {
        service.addUser(newUser);
    }

    /**
     * Edits an existing user.
     *
     * @param id      Integer ID of the user to edit.
     * @param newUser User object containing updated details of the user.
     */
    @PutMapping("/users")
    public void editUser(@RequestParam Integer id, @RequestBody User newUser) {
        service.editUser(id, newUser);
    }

    /**
     * Deletes a user.
     *
     * @param id Integer ID of the user to delete.
     */
    @DeleteMapping("/users")
    public void deleteUser(@RequestParam Integer id) {
        service.deleteUser(id);
    }
}
