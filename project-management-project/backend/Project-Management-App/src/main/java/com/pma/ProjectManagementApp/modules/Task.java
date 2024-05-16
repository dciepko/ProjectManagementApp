package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Task extends Activity{
    @OneToOne
    @JoinColumn(name = "chechlistID")
    @JsonIgnore
    private Checklist checklist;
}