import React, { useState } from "react";
import classes from "./UserSelect.module.css";
import { useSelector } from "react-redux";

const UserSelect = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const users = useSelector((state) => state.user.allUsers);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserClick = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.userID !== user.userID));
  };

  return (
    <div className={classes.inputContainer}>
      <p className={classes.label}>Wybierz uczestników</p>
      <div className={classes.userSelectContainer}>
        <div className={classes.bigInputContainer}>
          <div className={classes.chosenUsers}>
            {selectedUsers.map((user) => (
              <div key={user.userID} className={classes.selectedUser}>
                {user.userNickname}
                <button onClick={() => removeUser(user)}>X</button>
              </div>
            ))}
          </div>
          <input
            type="text"
            readOnly
            className={classes.chooseInput}
            onClick={toggleDropdown}
          />
        </div>
        {isDropdownOpen && (
          <div className={classes.dropdown}>
            {users.map((user) => (
              <div
                key={user.userID}
                className={classes.dropdownItem}
                onClick={() => handleUserClick(user)}
              >
                {user.userNickname}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelect;
