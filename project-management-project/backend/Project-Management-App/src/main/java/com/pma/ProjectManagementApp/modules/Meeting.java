package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Meeting extends Activity{

    private Integer meetingID;
    private Integer predDurMin;
}