package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Task extends Activity{
    private Integer taskID;

    @OneToOne
    @JoinColumn(name = "chechlistID")
    private Checklist checklist;
}
