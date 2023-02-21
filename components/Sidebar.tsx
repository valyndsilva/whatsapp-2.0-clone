import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  ArrowForwardIos,
  Chat,
  DonutLarge,
  NotificationsOff,
  Search,
} from "@mui/icons-material";
import { BasicMenu, Chats } from ".";
// import chats from "../data/chats";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Friend from "./Friend";
import { useAuth } from "../context/AuthContext";
import Fuse from "fuse.js";
import * as EmailValidator from "email-validator";
import { User } from "firebase/auth";

function Sidebar() {
  const { currentUser } = useAuth();
  // console.log(currentUser);
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const inputAreaRef = useRef(null);
  const [searchFriends, setSearchFriends] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  // console.log({ friends });
  // console.log({ chats });
  //Fetch friends list
  async function fetchFriends() {
    // Create a reference to the users collection
    const userRef = collection(db, "users");
    // console.log({ userRef });
    // Find email which are not the currentUser email since we don't want to show the currentUser email in the friends list
    const q = query(userRef, where("email", "!=", currentUser?.email));
    // Get all the users that are not the currentUser email
    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot", querySnapshot);
    setFriends(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  //Fetch chats
  async function fetchChats() {
    // Create a reference to the chats collection
    const chatsRef = collection(db, "chats");
    // console.log({ chatsRef });
    // Find users which have the currentUser uid since there might be multiple chats that belong to the currentUser uid
    const q = query(
      chatsRef,
      // where("users", "array-contains", currentUser.uid)
      where("users", "array-contains", currentUser.email)
    );
    // console.log({ q });
    // Get all chats that belong to the currentUser uid
    const querySnapshot = await getDocs(q);
    // console.log("querySnapshot", querySnapshot);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChats(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsubscribe;
  }

  useEffect(() => {
    fetchChats();
  }, []);

  const checkIfClickedOutside = (e: { target: any }) => {
    // If the user clicks outside of the input element, do something
    if (inputAreaRef.current && !inputAreaRef.current.contains(e.target)) {
      console.log("Clicked out of the search input");
      setTimeout(() => {
        setSearchFriends(false);
      }, 3000);
    } else {
      setSearchFriends(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  // Search friends using search input
  const fuse = new Fuse(friends, {
    keys: ["displayName", "email"],
  });
  const friends_result = fuse.search(inputSearch);
  // console.log(friends_result);

  // Start a new chat by typing an email in the input field
  const createChat = async (e: any) => {
    const input = prompt(
      "Please enter an email address of the user you want to chat with:"
    );
    if (!input) return null;

    const chatExists = (recipientEmail: string | User) => {
      console.log(
        chats?.find(
          (chat: DocumentData) =>
            chat.users.find((user: User) => user === recipientEmail)?.length > 0
        )
      );
      return !!chats?.find(
        (chat: DocumentData) =>
          chat.users.find((user: User) => user === recipientEmail)?.length > 0
      );
    };

    console.log("Chat exists?:", chatExists(input));
    alert(
      chatExists(input)
        ? "Recipient user already exists in db"
        : "Recipient user does not exist in db. Creating a new chat. If a recipient user is created with the same email, you will be able to chat with them."
    );

    if (
      !chatExists(input) &&
      EmailValidator.validate(input) &&
      input !== currentUser.email
    ) {
      // We need to add chat data into the DB 'chats' collection if it doesn't exists and is valid
      const docRef = await addDoc(collection(db, "chats"), {
        users: [currentUser.email, input],
      });
      console.log("docRef Document written with ID: ", docRef.id);
    }
  };

  return (
    <div className="bg-white min-w-[320px] max-w-[450px] h-full border-r overflow-y-scroll scrollContainer">
      <div className="flex sticky top-0 bg-white justify-between items-center p-4 h-[80px] border-b border-b-white w-full">
        <div className="flex space-x-2 items-center">
          <Avatar
            className="cursor-pointer hover:opacity:0.8"
            src={currentUser?.photoURL}
          />
          <span className="text-sm">
            Logged in as:{" "}
            <span className="text-gray-500 text-sm">{currentUser?.email}</span>
          </span>
        </div>

        <div className="flex">
          <IconButton onClick={createChat}>
            <Chat />
          </IconButton>
          <BasicMenu />
        </div>
      </div>
      <div className="flex justify-around items-center p-2 bg-[#9de1fe]">
        <Avatar className="bg-white">
          <NotificationsOff style={{ color: "#9DE1FE" }} />
        </Avatar>
        <div className="flex flex-col">
          <div>Get Notified Of New Messages</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="">
              <u>Turn on desktop notifications</u>
            </a>
            <IconButton>
              <ArrowForwardIos style={{ width: 10, height: 10 }} />
            </IconButton>
          </div>
        </div>
      </div>
      <button className="w-full border p-2" onClick={createChat}>
        Star a new chat
      </button>
      <div className="bg-[#f6f6f6] border-b border-b-black/10 p-5">
        <div className="flex p-[5px] rounded-md border-b border-b-[#ededed] bg-white">
          <Search />
          <input
            className="w-full outline-none border-none"
            ref={inputAreaRef}
            placeholder="Search in chats"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Get chats from /data/chat.json */}
      {/* {chats.map((chat, index) => (
        <Chats
          key={index}
          name={chat.name}
          photoURL={chat.photoURL}
          latestMessage={chat.latestMessage}
          timestamp={chat.timestamp}
        />
      ))} */}

      {/* Get chats from firebase */}
      {/* {friends.map((friend, index) => (
        <Friend
          key={index}
          displayName={friend.displayName}
          photoURL={friend.photoURL}
          id={friend.id}
        />
      ))} */}

      {searchFriends ? (
        <>
          {/* Display all the users except the currentUser */}
          {friends_result.map(({ item }) => (
            <Friend
              key={item.id}
              id={item.id}
              displayName={item.displayName}
              photoURL={item.photoURL}
            />
          ))}
        </>
      ) : (
        <>
          {/* Display chat items for the chats that belong to the currentUser */}
          {chats.map((chat) => (
            <Chats key={chat.id} chat={chat} users={chat.users} />
          ))}
        </>
      )}
    </div>
  );
}

export default Sidebar;
