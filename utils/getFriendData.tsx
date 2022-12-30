import React from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const getFriendData = async (users) => {
  const { currentUser } = getAuth();
  // Get all the users that are not the currentUser uid
  const friendId = users?.filter((user) => user !== currentUser.uid);
  console.log("friendId: ", friendId);
  // Get document by pointing to users collection which has the matching friendId
  const docRef = doc(db, "users", friendId[0]);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("Document data: No such document!");
    return;
  }
};

export default getFriendData;
