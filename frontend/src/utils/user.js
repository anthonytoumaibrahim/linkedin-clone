const setLocalUser = (id, name = "", email = "", is_company = false) => {
  localStorage.user = JSON.stringify({
    id: id,
    name: name,
    email: email,
    is_company: is_company,
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

export { setLocalUser, getLocalUser, removeLocalUser };
