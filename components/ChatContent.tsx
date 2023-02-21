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
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
// import messages from "../data/messages";
import Message from "./Message";
import getFriendData from "../utils/getFriendData";
import getRecipientEmail from "../utils/getRecipientEmail";

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

  const [recipientSnapshot, setRecipientSnapshot] =
    useState<QuerySnapshot<DocumentData>>();
  const user = currentUser;
  const users = chatParse.users;
  // Create a reference to the chats collection
  const recipientRef = collection(db, "users");
  // console.log({ recipientRef });

  // Create a query against the collection.
  const recipientQuery = query(
    recipientRef,
    where("email", "==", getRecipientEmail(users, user))
  );
  // console.log({ recipientQuery });

  useEffect(() => {
    const getRecipientSnapshot = async () => {
      const queryRecipientSnapshot = await getDocs(recipientQuery);
      // console.log({ queryRecipientSnapshot });
      setRecipientSnapshot(queryRecipientSnapshot);
    };
    getRecipientSnapshot();
  }, [recipientSnapshot]);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  // console.log({ recipient });
  const recipientPhotoURL = recipientSnapshot?.docs?.[0]?.data()?.photoURL;
  // console.log(recipient);
  const recipientEmail = getRecipientEmail(users, user);
  // console.log({ recipientEmail });

  return (
    <div className="flex flex-col h-full">
      <div className="sticky bg-white z-50 top-0 flex p-3 h-20 items-center border-b border-b-white">
        <Avatar src={recipient?.photoURL} />

        <div className="justify-center ml-4 flex-1">
          <h3 className="mt-0 mb-[3px]">
            {recipient?.displayName}{" "}
            <span className="text-gray-400 text-sm">({recipient?.email})</span>
          </h3>
          <div className="text-sm text-gray-500">
            Last Active: {moment(recipient?.lastSeen?.toDate()).fromNow()}
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
