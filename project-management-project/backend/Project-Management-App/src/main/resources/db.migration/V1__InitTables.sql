INSERT INTO user (userid, user_first_name, user_surename, user_nickname, user_email, user_password, working_hours, is_owner, role) VALUES (1, 'Marianna', 'Nowakowska', 'Mariankan', 'marianna@example.com', 'password123', '10-18', FALSE, 0);
INSERT INTO user (userid, user_first_name, user_surename, user_nickname, user_email, user_password, working_hours, is_owner, role) VALUES (2, 'Franciszek', 'Adamski', 'Adams', 'adams@example.com', 'password123', '8-16', TRUE, 1);
INSERT INTO user (userid, user_first_name, user_surename, user_nickname, user_email, user_password, working_hours, is_owner, role) VALUES (3, 'Gabriel', 'Wilk', 'Wilkor', 'gwilk@example.com', 'password123', '6-16', FALSE, 1);
--
--  INSERT INTO milestone (milestoneid, actual_date, activityid) VALUES(1, '2024-03-21', 1);
--  INSERT INTO milestone (milestoneid, actual_date, activityid) VALUES(2, '2024-03-21', 2);
--  INSERT INTO milestone (milestoneid, actual_date, activityid) VALUES(3, '2024-03-21', 3);

 INSERT INTO team (teamid, team_name) VALUES (1, 'Programming team');
 INSERT INTO team (teamid, team_name) VALUES (2, 'Design team');
 INSERT INTO team (teamid, team_name) VALUES (3, 'Managers team');

 INSERT INTO workspace (workspaceid, ownerid, workspace_name, ws_description, logo) VALUES (1, 1, 'Workspace1', 'The Greatest Company in the World', 'logo1.com');
 INSERT INTO workspace (workspaceid, ownerid, workspace_name, ws_description, logo) VALUES (2, 1, 'Firma WyCompany', 'Not dirty company', 'logo2.com');
 INSERT INTO workspace (workspaceid, ownerid, workspace_name, ws_description, logo) VALUES (3, 2, 'Workspace Space', 'The first Company in the Space', 'logo3.com');

 INSERT INTO project (projectid, end_date, ownerid, project_description, project_name, start_date, statusid, workspaceid) VALUES(1, '2024-03-21', 1, 'Creating a database for a secret project', 'Database Project', '2024-03-21', 1, 1);
 INSERT INTO project (projectid, end_date, ownerid, project_description, project_name, start_date, statusid, workspaceid) VALUES(2, '2024-03-21', 1, 'Application design for creating databases', 'DatabasesApp', '2024-03-21', 2, 2);
 INSERT INTO project (projectid, end_date, ownerid, project_description, project_name, start_date, statusid, workspaceid) VALUES(3, '2024-03-21', 1, 'Creating a dog training application', 'DogTrainingApp', '2024-03-21', 3, 3);

 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (1, 'yellow', 'Do zrobienia', 1);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (2, 'purple', 'W trakcie', 1);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (3, 'green', 'Zrobione', 1);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (4, 'yellow', 'Do zrobienia', 2);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (5, 'purple', 'W trakcie', 2);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (6, 'green', 'Zrobione', 2);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (7, 'yellow', 'Do zrobienia', 3);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (8, 'purple', 'W trakcie', 3);
 INSERT INTO status_table (tableid, table_color, table_name, projectID) VALUES (9, 'green', 'Zrobione', 3);

 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (1, 'Summary of this week s achievements', 'Weekly meeting', 1, 1, '2024-03-21', 1, 1, 1, 1);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (2, 'Discussion of code errors', 'Errors meeting', 1, 1, '2024-03-21', 1, 1, 2, 1);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (3, 'Discussion on marketing strategy', 'Marketing meeting', 1, 1, '2024-03-21', 1, 1, 2, 1);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (4, 'Designing the appearance of the home page', 'Home page design', 1, 2, '2024-03-21', 2, 2, 3, 1);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (5, 'Add a post to the home page', 'Adding post', 1, 2, '2024-03-21', 3, 3, 3, 1);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (6, 'Improve the code in the likeunlike method', 'Code improvement', 1, 2, '2024-03-22', 3, 3, 4, 2);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (7, 'Completing the mobile version of the application', 'Mobile version', 1, 3, '2024-03-21', 3, 3, 5, 2);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (8, 'Completing the design of the application s appearance in the mobile and desktop versions', 'Completed design', 1, 3, '2024-03-21', 3, 3, 5, 2);
 INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid, projectid) VALUES (9, 'Reaching 10,000 subscribers', 'Subscribe goal', 1, 3, '2024-03-28', 3, 3, 5, 2);

 INSERT INTO comment (commentid, comment, comment_date, activityid, userid) VALUES (1, 'Change the icon to a heart', '2024-03-21', 1, 1);
 INSERT INTO comment (commentid, comment, comment_date, activityid, userid) VALUES (2, 'Incorrectly constructed method', '2024-03-21', 1, 1);
 INSERT INTO comment (commentid, comment, comment_date, activityid, userid) VALUES (3, 'Great job!', '2024-03-25', 1, 2);

 INSERT INTO attachement (attachementid, attachement_name, attachement_type, attachement_url, date, activityid, userid) VALUES (1, 'Instructional video', 'url', 'example.com', '2024-03-21', 1, 1);
 INSERT INTO attachement (attachementid, attachement_name, attachement_type, attachement_url, date, activityid, userid) VALUES (2, 'Database project', 'url', 'example.com', '2024-03-21', 2, 2);
 INSERT INTO attachement (attachementid, attachement_name, attachement_type, attachement_url, date, activityid, userid) VALUES (3, 'Ideas for icons', 'url', 'example.com', '2024-03-21', 3, 3);

 INSERT INTO notification (notificationid, notification_content, notification_date, userid) VALUES (1, 'You have been added to the project', '2024-03-21', 1);
 INSERT INTO notification (notificationid, notification_content, notification_date, userid) VALUES (2, 'You have been assigned a task', '2024-03-21', 3);
 INSERT INTO notification (notificationid, notification_content, notification_date, userid) VALUES (3, 'You have been added to the project', '2024-03-25', 2);

-- INSERT INTO task (taskid, activityid, chechlistid) VALUES (1, 1, 1);
-- INSERT INTO task (taskid, activityid, chechlistid) VALUES (1, 2, 2);
-- INSERT INTO task (taskid, activityid, chechlistid) VALUES (1, 3, 3);

 INSERT INTO user_activity (userid, activityid) VALUES (1, 1);
 INSERT INTO user_activity (userid, activityid) VALUES (2, 2);
 INSERT INTO user_activity (userid, activityid) VALUES (3, 3);

 INSERT INTO user_project (userid, projectid) VALUES (1, 1);
 INSERT INTO user_project (userid, projectid) VALUES (2, 2);
 INSERT INTO user_project (userid, projectid) VALUES (3, 3);

  INSERT INTO user_workspace (userid, workspaceid) VALUES (1, 1);
  INSERT INTO user_workspace (userid, workspaceid) VALUES (2, 2);
  INSERT INTO user_workspace (userid, workspaceid) VALUES (3, 3);

 INSERT INTO user_team (userid, teamid) VALUES (1, 1);
 INSERT INTO user_team (userid, teamid) VALUES (2, 2);
 INSERT INTO user_team (userid, teamid) VALUES (3, 3);

 INSERT INTO team_project (teamid, projectid) VALUES (1, 1);
 INSERT INTO team_project (teamid, projectid) VALUES (2, 2);
 INSERT INTO team_project (teamid, projectid) VALUES (3, 3);
