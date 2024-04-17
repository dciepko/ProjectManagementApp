package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer avatarID;
    private String avatarUrl;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User userA;
}
