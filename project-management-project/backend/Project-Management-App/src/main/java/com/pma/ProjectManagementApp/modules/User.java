package com.pma.ProjectManagementApp.modules;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;
    private String userFirstName;
    private String userSurename;
    private String userNickname;
    private String userEmail;
    private String userPassword;
    private String workingHours;
    private Boolean isOwner;

    private String role;

    @OneToMany(mappedBy = "userA")
    @JsonIgnore
    private List<Avatar> avatars;
    @OneToMany(mappedBy = "userCom")
    @JsonIgnore
    private List<Comment> comments;
    @OneToMany(mappedBy = "userAtt")
    @JsonIgnore
    private List<Attachement> attachements;
    @OneToMany(mappedBy = "userNotification")
    @JsonIgnore
    private List<Notification> notifications;

    @ManyToMany
    @JoinTable(name = "user_project", joinColumns = {@JoinColumn(name = "userID")},
            inverseJoinColumns ={@JoinColumn(name = "projectID")})
    @JsonIgnore
    private List<Project> projectsU;

    @ManyToMany
    @JoinTable(name = "user_activity", joinColumns = {@JoinColumn(name = "userID")},
            inverseJoinColumns ={@JoinColumn(name = "activityID")})
    @JsonIgnore
    private List<Activity> activitiesUser;

    @ManyToMany
    @JoinTable(name = "user_team", joinColumns = {@JoinColumn(name = "userID")},
            inverseJoinColumns ={@JoinColumn(name = "teamID")})
    @JsonIgnore
    private List<Team> teams;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userNickname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}