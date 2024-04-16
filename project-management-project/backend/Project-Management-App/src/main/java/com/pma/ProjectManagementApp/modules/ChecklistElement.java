package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ChecklistElement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checklistElementID;
    private String elementName;
    private Boolean isDone;

    @ManyToOne
    @JoinColumn(name = "checklistID")
    private Checklist checklist;
}