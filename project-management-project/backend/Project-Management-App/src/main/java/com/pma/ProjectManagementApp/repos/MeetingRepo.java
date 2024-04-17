package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepo extends JpaRepository<Meeting, Integer> {
}
