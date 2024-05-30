export async function fetchUsers() {
  const response = await fetch("http://localhost:8080/users");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Nie udało się załadować użytkowników");
  }

  return resData;
}

export async function fetchProjects() {
  const response = await fetch("http://localhost:8080/projects");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Nie udało się załadować projektów");
  }

  return resData;
}

export async function addProject(newProject) {
  fetch("http://localhost:8080/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  });
}

export async function deleteProjectById(projectId) {
  const response = await fetch(
    `http://localhost:8080/projects?id=${projectId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się usunąć projektu");
  }
}

export async function fetchTasks(projectId) {
  try {
    console.log("Fetching tasks for projectId:", projectId);
    const response = await fetch(
      `http://localhost:8080/activities/${projectId}`
    );
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Nie udało się załadować tasków");
    }

    console.log("Fetched tasks data:", resData);
    return resData;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function addActivity(newProject) {
  const response = await fetch("http://localhost:8080/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  });

  if (!response.ok) {
    throw new Error("Nie udało się dodać aktywności");
  }
}

export async function updateActivity(activity) {
  const response = await fetch(
    `http://localhost:8080/activities/${activity.activityID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się zaktualizować aktywności");
  }
}

export async function deleteActivityById(activityID) {
  const response = await fetch(
    `http://localhost:8080/projects?id=${activityID}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się usunąć aktywności");
  }
}

export async function addBoard(projectID, newBoard) {
  console.log(projectID);
  fetch(`http://localhost:8080/projects/${projectID}/boards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBoard),
  });
}

export async function updateBoard(board) {
  console.log("http");
  const response = await fetch(
    `http://localhost:8080/projects/${board.tableID}/boards`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(board),
    }
  );

  if (!response.ok) {
    throw new Error("Nie udało się zaktualizować tablicy");
  }
}
