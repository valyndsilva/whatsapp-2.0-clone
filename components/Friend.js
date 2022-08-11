import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
function Friend({ photoURL, displayName, id }) {
  const { currentUser } = useAuth();

  // Create a new chat
  const createChat = async (id) => {
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
    const chatAlreadyExits = (friend_id) => {
      console.log("Chat already exists");
      !!querySnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === friend_id)?.length > 0
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
    <Container onClick={() => createChat(id)}>
      <FrndAvatar src={photoURL} />
      <FriendContainer>
        <div style={{ gridArea: "name" }}>{displayName}</div>
      </FriendContainer>
    </Container>
  );
}

export default Friend;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  min-height: 67px;
  padding-left: 15px;
  word-break: break-word;
  :hover {
    background-color: #f5f5f5;
  }
`;

const FrndAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

const FriendContainer = styled.div`
  display: grid;
  padding: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid #ededed;
  gap: 10px;
  grid-template-areas:
    "name name time"
    "latest_message latest_message.";
`;
