package com.pma.ProjectManagementApp.modules;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Attachement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attachementID;
    private String attachementName;
    private Date date; //Date?
    private String attachementUrl;
    private String attachementType;

    @ManyToOne //Też nmw bo jeden uz moze miec wiele zal ale na odwrót?
    @JoinColumn(name = "userID")
    private User userAtt;
}