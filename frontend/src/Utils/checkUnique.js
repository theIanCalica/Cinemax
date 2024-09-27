import axios from "axios";

export const checkUnique = (field, value) => {
  return axios
    .get(`${process.env.REACT_APP_API_LINK}/users/check-unique`, {
      params: { [field]: value },
    })
    .then((response) => {
      return response.data.isUnique;
    })
    .catch((error) => {
      console.error("Error checking uniqueness:", error);
      return false;
    });
};
