const setLocalUser = (id, name = "", email = "") => {
  localStorage.user = JSON.stringify({
    id: id,
    name: name,
    email: email,
  });
};
const getLocalUser = () => {
  const user = localStorage.user;
  if (user) {
    return JSON.parse(user);
  }
  return false;
};
const removeLocalUser = () => {
  localStorage.removeItem("user");
};

export { setLocalUser, getLocalUser };
