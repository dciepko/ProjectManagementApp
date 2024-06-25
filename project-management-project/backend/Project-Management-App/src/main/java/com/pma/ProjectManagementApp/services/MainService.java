package com.pma.ProjectManagementApp.services;

import com.pma.ProjectManagementApp.models.IMainModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

public class MainService <M extends IMainModel, R extends JpaRepository<M,Integer>>{
    @Autowired
    private R repo;

    public List<M> getAll() {
        return repo.findAll();
    }

    public void add(M model) {
        repo.save(model);
    }

    public void edit(Integer id, M model) {
        M editedModel = repo.findById(id).get();
        if(editedModel!=null) {
            repo.save(model);
        }
    }

    public void delete(Integer id) {
        if(!repo.findById(id).isEmpty())
            repo.deleteById(id);
        else System.out.println("No object to delete");
    }
}
