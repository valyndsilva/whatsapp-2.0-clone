import React from "react";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const getFriendData = async (users) => {
  const { currentUser } = getAuth();
  console.log(currentUser);
  // // Get all the users that are not the currentUser uid
  // const friendId = users?.filter((user) => user !== currentUser.uid);
  // console.log(users?.filter((user) => user !== currentUser.uid));
  // console.log("friendId: ", friendId);
  // // Get document by pointing to users collection which has the matching friendId
  // const docRef = doc(db, "users", friendId[0]);
  // const docSnap = await getDoc(docRef);
  // if (docSnap.exists()) {
  //   console.log("Friend document data:", docSnap.data());
  //   return docSnap.data();
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("Document data: No such document!");
  //   return;
  // }

  // Get all the users that are not the currentUser email
  const friendEmail = users?.filter((user) => user !== currentUser.email);
  console.log("friendEmail: ", friendEmail);
  // Get document by pointing to users collection which has the matching friendId
  const docRef = doc(db, "users", friendEmail[0]);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Friend document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("Document data: No such document!");
    return;
  }
};

export default getFriendData;
