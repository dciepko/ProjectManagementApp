package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.IMainModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Generic service class providing basic CRUD operations for any class implementing IMainModel.
 *
 * @param <M> Type of the model implementing IMainModel
 * @param <R> Type of the JpaRepository for the model
 */
public class MainService<M extends IMainModel, R extends JpaRepository<M, Integer>> {
    @Autowired
    private R repo;

    /**
     * Retrieves all instances of the model from the repository.
     *
     * @return List of all instances of the model
     */
    public List<M> getAll() {
        return repo.findAll();
    }

    /**
     * Saves a new instance of the model in the repository.
     *
     * @param model Instance of the model to be saved
     */
    public void add(M model) {
        repo.save(model);
    }

    /**
     * Updates an existing instance of the model in the repository.
     *
     * @param id    ID of the model instance to be updated
     * @param model Updated instance of the model
     */
    public void edit(Integer id, M model) {
        M editedModel = repo.findById(id).orElse(null);
        if (editedModel != null) {
            repo.save(model);
        }
    }

    /**
     * Deletes an instance of the model from the repository.
     *
     * @param id ID of the model instance to be deleted
     */
    public void delete(Integer id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            System.out.println("No object to delete");
        }
    }
}
