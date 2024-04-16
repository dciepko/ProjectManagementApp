package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Task extends Activity{
    private Integer taskID;
}
