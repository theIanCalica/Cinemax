export const setUser = (user) => ({
  type: "SET_USER",
  payload: { user, loggedIn: true }, // Set loggedIn to true when user logs in
});

export const clearUser = () => ({
  type: "CLEAR_USER",
});
