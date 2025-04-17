import React, { useEffect, useState } from "react";
import classes from "./UserSelect.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../store/user-slice";

let firstClick = true;

const UserSelect = ({ onUsersChoose }) => {
  const users = useSelector((state) => state.user.allUsers);
  const alfabeticalUsers = users.slice();
  alfabeticalUsers.sort((a, b) => a.userNickname.localeCompare(b.userNickname));

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownUsers, setDropdownUsers] = useState(alfabeticalUsers);

  const toggleDropdown = () => {
    if (firstClick) {
      setDropdownUsers(alfabeticalUsers);
      firstClick = false;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserClick = (user) => {
    if (!selectedUsers.includes(user)) {
      let newList = selectedUsers.slice();
      newList.push(user);
      setSelectedUsers(newList);
      onUsersChoose(newList);

      setDropdownUsers(dropdownUsers.filter((u) => u.userID !== user.userID));
    }
  };

  const removeUser = (user) => {
    let newList = selectedUsers.filter((u) => u.userID !== user.userID);
    setSelectedUsers(newList);
    onUsersChoose(newList);

    const alf = dropdownUsers.slice();
    alf.push(user);
    alf.sort((a, b) => a.userNickname.localeCompare(b.userNickname));
    setDropdownUsers(alf);
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
                <button onClick={() => removeUser(user)} type="button">
                  X
                </button>
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
            {dropdownUsers.map((user) => (
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
