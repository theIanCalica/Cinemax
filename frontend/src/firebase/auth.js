import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  updateEmail,
  setPersistence,
  browserSessionPersistence,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getToken } from "firebase/messaging";
import { auth, messaging } from "./firebase";

const fbAuthProvider = new FacebookAuthProvider(); //Facebook Authentication

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const reauthenticateAndChangePassword = async (
  email,
  currentPassword,
  newPassword
) => {
  try {
    // Step 1: Log in the user with the current password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      currentPassword
    );
    const user = userCredential.user; // Get the user from the credential

    console.log(user); // Log the authenticated user details for debugging

    // Step 2: Change the password after successful login
    await updatePassword(user, newPassword);
    console.log("Password updated successfully!");

    return "Password updated successfully!";
  } catch (error) {
    console.error("Error updating password:", error.message);
    throw error; // Pass the error back to handle in the UI
  }
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

export const FacebookAuth = async () => {
  await setPersistence(auth, browserSessionPersistence);
  const fbAuth = await signInWithPopup(auth, fbAuthProvider); // Await the authentication
  console.log(fbAuth);
  const { uid, displayName, email, photoURL } = fbAuth.user; // Extract uid and other user details

  let fname = "";
  let lname = "";
  if (displayName) {
    const nameParts = displayName.split(" ");
    fname = nameParts[0];
    lname = nameParts.slice(1).join(" "); // Handles cases with middle names
  }

  return { uid, fname, lname, email, photoURL };
};

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BMX6l1me1__VmktJ-T3s8grVBB_F2QHhBhDCAvYTdCxiAOMT0mx_I92P8z4Kw14heDsT_c43peD6Thk35EBdLxM",
      });
      console.log(token);

      // Return the token here
      return token;
    } else {
      console.log("Permission not granted.");
      return null; // Return null if permission is not granted
    }
  } catch (error) {
    console.error("Error generating token:", error);
    return null; // Return null in case of an error
  }
};

export const doUpdateEmail = async (newEmail) => {
  try {
    if (auth.currentUser) {
      await updateEmail(auth.currentUser, newEmail);
      console.log("Email updated successfully in Firebase.");
    } else {
      throw new Error("No authenticated user found.");
    }
  } catch (error) {
    console.error("Error updating email in Firebase:", error.message);
    throw error; // Rethrow to handle it in the calling function
  }
};
