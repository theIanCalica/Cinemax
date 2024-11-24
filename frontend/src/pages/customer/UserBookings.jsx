import React, { useState } from "react";
import client from "../../Utils/client";
import { getUser, notifyError } from "../../Utils/helpers";

const UserBookings = () => {
  const user = getUser();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    client
      .get("")
      .then((response) => {})
      .catch((error) => {
        notifyError("Error fetching bookings");
      });
  };

  return (
    <>
      <div></div>
    </>
  );
};

export default UserBookings;
