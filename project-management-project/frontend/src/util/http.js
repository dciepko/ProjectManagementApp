export async function fetchUsers() {
  const response = await fetch("http://localhost:8080/users");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Nie udało się załadować użytkowników");
  }

  return resData;
}
