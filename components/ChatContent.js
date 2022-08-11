import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
// import messages from "../data/messages";
import Message from "./Message";
import getFriendData from "../utils/getFriendData";

function ChatContent({ chat, chat_id, messagesProps }) {
  const { currentUser } = useAuth();
  const [friend, setFriend] = useState({});
  const chatParse = JSON.parse(chat);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesParse = JSON.parse(messagesProps);
    // console.log({messagesParse});
    setMessages(messagesParse);
  }, []);

  useEffect(() => {
    if (chatParse.users?.length > 0) {
      console.log("Chat has users: has chatParse");
      console.log("chatParse.users", chatParse.users);
      getFriendData(chatParse.users).then((data) => {
        setFriend(data);
      });
    } else {
      console.log("No chat users: No chatParse");
    }
  }, [chat_id]);

  // Send Message Functionality
  const sendMessage = async (e) => {
    e.preventDefault();
    // Store the user active time
    const usersRef = doc(db, "users", currentUser.uid);
    setDoc(usersRef, { lastSeen: serverTimestamp() }, { merge: true });
    // Store the message
    const messageRef = collection(db, "chats", chat_id, "messages");
    await addDoc(messageRef, {
      message: input,
      timestamp: serverTimestamp(),
      user: currentUser.email,
      photoURL: currentUser.photoURL,
    });
    // Add latest message and update the timestamp
    const chatRef = doc(db, "chats", chat_id);
    setDoc(
      chatRef,
      { latestMessage: input, timestamp: serverTimestamp() },
      { merge: true }
    );
    setInput("");
  };

  // Fetch the messages from firestore and display them in ChatContent
  useEffect(() => {
    const messagesRef = collection(db, "chats", chat_id, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
      return unsubscribe;
    });
  }, [chat_id]);

  return (
    <Container>
      <Header>
        <Avatar src={friend.photoURL} />
        <HeaderInfo>
          <h3>{friend.displayName}</h3>
          <div>Last Active: {moment(friend.lastSeen?.toDate()).fromNow()}</div>
        </HeaderInfo>
        <IconButton>
          <Search />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Header>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
      </MessagesContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <Input
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <IconButton>
          <Mic />
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  justify-content: center;
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-top: 0;
    margin-bottom: 3px;
  }
  > div {
    font-size: 14px;
    color: gray;
  }
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #f0f0f0;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 30px;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const MessagesContainer = styled.div`
  padding: 20px;
  background-color: #e5ded8;
  flex: 1;
  background-image: url("/assets/whatsapp-bg-color.png");
  background-repeat: repeat;
  background-attachment: fixed;
`;
