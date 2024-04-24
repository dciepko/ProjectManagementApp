INSERT INTO user (userid, user_name, user_surename, user_nickname, user_email, user_password, working_hours, is_owner) VALUES (1, 'Marianna', 'Nowakowska', 'Mariankan', 'marianna@example.com', 'password123', '10-18', FALSE);
INSERT INTO user (userid, user_name, user_surename, user_nickname, user_email, user_password, working_hours, is_owner) VALUES (2, 'Franciszek', 'Adamski', 'Adams', 'adams@example.com', 'password123', '8-16', TRUE);
INSERT INTO user (userid, user_name, user_surename, user_nickname, user_email, user_password, working_hours, is_owner) VALUES (3, 'Gabriel', 'Wilk', 'Wilkor', 'gwilk@example.com', 'password123', '6-16', FALSE);

INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid) VALUES (1, 'meeting1', 'meeting', 1, 1, '21.03.2024', 1, 1, 1);
INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid) VALUES (2, 'task1', 'task', 1, 1, '22.03.2024', 2, 2, 2);
INSERT INTO activity (activityid, activity_description, activity_name, activity_priority, activity_type, due_date, statusid, labelid, tableid) VALUES (3, 'milestone1', 'milestone', 1, 1, '23.03.2024', 3, 3, 3);

INSERT INTO attachement (attachementid, attachement_name, attachement_type, attachement_url, date, activityid, userid) VALUES (1, 'zalacznik1', 'link', 'example.com', '21.03.2024', 1, 1);
INSERT INTO attachement (attachementid, attachement_name, attachement_type, attachement_url, date, activityid, userid) VALUES (2, 'zalacznik2', 'link', 'example.com', '22.03.2024', 2, 2);
INSERT INTO attachement (attachementid, attachement_name, attachement_type, attachement_url, date, activityid, userid) VALUES (3, 'zalacznik3', 'link', 'example.com', '23.03.2024', 3, 3);

INSERT INTO avatar (avatarid, avatar_url, userid) VALUES (1, "exampleurl.com", 1);
INSERT INTO avatar (avatarid, avatar_url, userid) VALUES (2, "exampleurl.com", 2);
INSERT INTO avatar (avatarid, avatar_url, userid) VALUES (3, "exampleurl.com", 3);

INSERT INTO checklist (checklistid, is_done) VALUES (1, FALSE);
INSERT INTO checklist (checklistid, is_done) VALUES (2, FALSE);
INSERT INTO checklist (checklistid, is_done) VALUES (3, FALSE);

INSERT INTO checklist_element (checklist_elementid, element_name, is_done, checklistid) VALUES (1, 'element 1', FALSE, 1);
INSERT INTO checklist_element (checklist_elementid, element_name, is_done, checklistid) VALUES (2, 'element 2', FALSE, 2);
INSERT INTO checklist_element (checklist_elementid, element_name, is_done, checklistid) VALUES (3, 'element 3', FALSE, 3);

INSERT INTO comment (commentid, comment, comment_date, activityid, userid) VALUES (1, 'komentarz 1', 21.03.2023, 1);
INSERT INTO comment (commentid, comment, comment_date, activityid, userid) VALUES (2, 'komentarz 2', 22.03.2023, 2);
INSERT INTO comment (commentid, comment, comment_date, activityid, userid) VALUES (3, 'komentarz 3', 23.03.2023, 3);

INSERT INTO label (labelid, label_color) VALUES(1, 'green');
INSERT INTO label (labelid, label_color) VALUES(2, 'blue');
INSERT INTO label (labelid, label_color) VALUES(3, 'pink');

INSERT INTO meeting (meetingid, pred_dur_min, activityid) VALUES (1, 20, 1);
INSERT INTO meeting (meetingid, pred_dur_min, activityid) VALUES (2, 20, 2);
INSERT INTO meeting (meetingid, pred_dur_min, activityid) VALUES (3, 20, 3);

INSERT INTO milestone (milestoneid, actual_date, activityid) VALUES(1, '21.03.2024', 1);
INSERT INTO milestone (milestoneid, actual_date, activityid) VALUES(2, '22.03.2024', 2);
INSERT INTO milestone (milestoneid, actual_date, activityid) VALUES(3, '23.03.2024', 3);

INSERT INTO project (projectid, end_date, ownerid, project_description, project_name, start_date, statusid, tableid, teamid) VALUES(1, '21.03.2024', 1, 'description 1', 'Projekt1', '20.02.2024', 1, 1, 1);
INSERT INTO project (projectid, end_date, ownerid, project_description, project_name, start_date, statusid, tableid, teamid) VALUES(2, '22.03.2024', 1, 'description 2', 'Projekt2', '21.02.2024', 2, 2, 2);
INSERT INTO project (projectid, end_date, ownerid, project_description, project_name, start_date, statusid, tableid, teamid) VALUES(3, '23.03.2024', 1, 'description 3', 'Projekt3', '22.02.2024', 3, 3, 3);

INSERT INTO status (statusid, status_name) VALUES (1, 'Do zrobienia');
INSERT INTO status (statusid, status_name) VALUES (2, 'W trakcie');
INSERT INTO status (statusid, status_name) VALUES (3, 'Zakonczone');

INSERT INTO status_table (tableid, table_color, table_name) VALUES (1, 'yellow', 'table1');
INSERT INTO status_table (tableid, table_color, table_name) VALUES (2, 'purple', 'table2');
INSERT INTO status_table (tableid, table_color, table_name) VALUES (3, 'green', 'table3');

INSERT INTO task (taskid, activityid, checklistid) VALUES (1, 1, 1);
INSERT INTO task (taskid, activityid, checklistid) VALUES (1, 2, 2);
INSERT INTO task (taskid, activityid, checklistid) VALUES (1, 3, 3);

INSERT INTO team (teamid, team_name) VALUES (1, 'zespol programistyczny');
INSERT INTO team (teamid, team_name) VALUES (2, 'zespol designu');
INSERT INTO team (teamid, team_name) VALUES (3, 'zespol managerski');

INSERT INTO activity_project (activityid, projectid) VALUES (1, 1);
INSERT INTO activity_project (activityid, projectid) VALUES (2, 2);
INSERT INTO activity_project (activityid, projectid) VALUES (3, 3);