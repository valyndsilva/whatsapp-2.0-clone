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
  const [friend, setFriend] = useState<FriendData>();
  const chatParse = JSON.parse(chat);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const messagesParse = JSON.parse(messagesProps);
    // console.log({messagesParse});
    setMessages(messagesParse);
  }, []);

  useEffect(() => {
    if (chatParse.users?.length > 0) {
      console.log("Chat has users: has chatParse");
      console.log("chatParse.users", chatParse.users);
      getFriendData(chatParse.users).then((data: FriendData) => {
        console.log("getFriendData:", data);

        setFriend(data);
        console.log(friend);
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
    <div className="flex flex-col h-full">
      <div className="sticky bg-white z-50 top-0 flex p-3 h-20 items-center border-b border-b-white">
        <Avatar src={friend?.photoURL} />
        <div className="justify-center ml-4 flex-1">
          <h3 className="mt-0 mb-[3px]">{friend?.displayName}</h3>
          <div className="text-sm text-gray-500">
            Last Active: {moment(friend?.lastSeen?.toDate()).fromNow()}
          </div>
        </div>
        <IconButton>
          <Search />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
      <div className="p-5 bg-[#e5ded8] flex-1 bg-repeat bg-fixed bg-[url('/assets/whatsapp-bg-color.png')]">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} style={{ marginBottom: 100 }} />
      </div>
      <form className="flex items-center p-3 sticky bottom-0 bg-[#f0f0f0] z-50">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <input
          className="flex-1 outline-none border-none rounded-full p-5 mx-4"
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
      </form>
    </div>
  );
}

export default ChatContent;
