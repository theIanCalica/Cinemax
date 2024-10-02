const initialState = {
  user: null,
  loggedIn: false, // Add loggedIn flag to track login status
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn, // Update loggedIn flag
      };
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
        loggedIn: false, // Reset loggedIn flag on logout
      };
    default:
      return state;
  }
};

export default userReducer;
