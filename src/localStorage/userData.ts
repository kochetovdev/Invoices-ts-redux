export function getUserDataAuth() {
  const userDataString = localStorage.getItem("user");
  let userData;
  if (userDataString) {
    userData = JSON.parse(userDataString);
  }

  return userData;
}
