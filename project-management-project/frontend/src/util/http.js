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

export async function fetchTasks(projectId) {
  const response = await fetch(`http://localhost:8080/activities/${projectId}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Nie udało się załadować tasków");
  }

  return resData;
}
