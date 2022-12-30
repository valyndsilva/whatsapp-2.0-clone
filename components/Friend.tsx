import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
function Friend({ photoURL, displayName, id }) {
  const { currentUser } = useAuth();

  // Create a new chat
  const createChat = async (id: any) => {
    // Create a collection of chats
    const chatsRef = collection(db, "chats");
    // Find users which have the currentUser uid since there might be multiple chats that belong to the currentUser uid
    const q = query(
      chatsRef,
      where("users", "array-contains", currentUser.uid)
    );
    // Get all chats that belong to the currentUser uid
    const querySnapshot = await getDocs(q);

    // Check if the currentUser chat already exists in chats collection with a given friend_id
    // (!! condition returns true or false)
    const chatAlreadyExits = (friend_id: any) => {
      console.log("Chat already exists");
      return !!querySnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user: any) => user === friend_id)?.length > 0
      );
    };

    console.log("Create chat");
    if (!chatAlreadyExits(id)) {
      console.log("New Chat");
      // Add new document to chats collection. Each chat will have the currentUser uid and the friend id
      addDoc(chatsRef, { users: [currentUser.uid, id] });
    } else {
      console.log("Chat already exists");
    }
  };
  return (
    <div
      className="flex items-center cursor-pointer min-[67px]  pl-4 break-words hover:bg-[#f5f5f5]"
      onClick={() => createChat(id)}
    >
      <Avatar className="m-[5px] mr-4" src={photoURL} />
      <div>
        <div style={{ gridArea: "name" }}>{displayName}</div>
      </div>
    </div>
  );
}

export default Friend;
