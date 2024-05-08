package com.pma.ProjectManagementApp.controllers;

import com.pma.ProjectManagementApp.models.UserDto;
import com.pma.ProjectManagementApp.modules.User;
import com.pma.ProjectManagementApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return service.getUsers();
    }

    @PostMapping("/users")
    public void addUser(@RequestBody User newUser) {
        service.addUser(newUser);
    }

    @PutMapping("/users")
    public void editUser(@RequestParam Integer id, @RequestBody User newUser) {
        service.editUser(id, newUser);
    }

    @DeleteMapping("/users")
    public void deleteUser(@RequestParam Integer id) {
        service.deleteUser(id);
    }
}
