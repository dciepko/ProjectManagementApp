package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Checklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checklistID;
    private Boolean isDone;

    @OneToMany(mappedBy = "checklist")
    private List<ChecklistElement> checklistElements;

    @JsonIgnore
    @OneToOne(mappedBy = "checklist")
    private Task task;
}