package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Milestone extends Activity{
    private Integer milestoneID;
    private Date actualDate;
}