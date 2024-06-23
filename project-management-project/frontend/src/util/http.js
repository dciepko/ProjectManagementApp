import { getAuthToken } from "./auth";

export async function fetchUsers() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/users", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Nie udało się załadować użytkowników");
  }

  return resData;
}

export async function fetchProjects() {
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/projects", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Nie udało się załadować projektów");
  }

  return resData;
}

export async function fetchProjectsByID(workspaceID) {
  const token = getAuthToken();
  try {
    const response = await fetch(
      `http://localhost:8080/projects/${workspaceID}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Nie udało się załadować projektów");
    }
    return resData;
  } catch (error) {
    throw error;
  }
}

export async function addProject(newProject) {
  const token = getAuthToken();
  fetch("http://localhost:8080/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newProject),
  });
}

export async function deleteProjectById(projectId) {
  const token = getAuthToken();
  const response = await fetch(
    `http://localhost:8080/projects?id=${projectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się usunąć projektu");
  }
}

export async function fetchTasks(projectId) {
  const token = getAuthToken();

  try {
    const response = await fetch(
      `http://localhost:8080/activities/${projectId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Nie udało się załadować tasków");
    }

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function addActivity(newProject) {
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newProject),
  });

  if (!response.ok) {
    throw new Error("Nie udało się dodać aktywności");
  }
}

export async function updateActivity(activity) {
  const token = getAuthToken();

  const response = await fetch(
    `http://localhost:8080/activities/${activity.activityID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(activity),
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się zaktualizować aktywności");
  }
}

export async function deleteActivityById(activityID) {
  const token = getAuthToken();

  const response = await fetch(
    `http://localhost:8080/projects?id=${activityID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się usunąć aktywności");
  }
}

export async function addBoard(projectID, newBoard) {
  const token = getAuthToken();

  console.log(projectID);
  fetch(`http://localhost:8080/projects/${projectID}/boards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newBoard),
  });
}

export async function updateBoard(board) {
  const token = getAuthToken();

  const response = await fetch(
    `http://localhost:8080/projects/${board.tableID}/boards`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(board),
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się zaktualizować tablicy");
  }
}

export async function fetchWorkspaces(userID) {
  const token = getAuthToken();

  const response = await fetch(`http://localhost:8080/workspaces/${userID}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Nie udało się załadować workspace'ów");
  }
  return resData;
}

export async function addWorkspace(newWorkspace) {
  const token = getAuthToken();
  console.log(JSON.stringify(newWorkspace));

  fetch(`http://localhost:8080/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newWorkspace),
  });
}
