package com.pma.ProjectManagementApp.repos;

import com.pma.ProjectManagementApp.modules.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer> {
}
