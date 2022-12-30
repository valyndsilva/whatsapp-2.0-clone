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
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Friend from "./Friend";
import { useAuth } from "../context/AuthContext";
import Fuse from "fuse.js";

function Sidebar() {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const inputAreaRef = useRef(null);
  const [searchFriends, setSearchFriends] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  // Search friends using search input
  const fuse = new Fuse(friends, {
    keys: ["diplayName", "email"],
  });
  const friends_result = fuse.search(inputSearch);
  console.log(friends_result);
  //Fetch friends list
  useEffect(() => {
    async function fetchFriends() {
      // Create a collection of users
      const userRef = collection(db, "users");
      // Find email which are not the currentUser email since we don't want to show the currentUser email in the friends list
      const q = query(userRef, where("email", "!=", currentUser?.email));
      // Get all the users that are not the currentUser email
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot);
      setFriends(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    fetchFriends();
  }, []);

  //Fetch chats
  useEffect(() => {
    async function fetchChats() {
      // Create a collection of chats
      const chatsRef = collection(db, "chats");
      // Find users which have the currentUser uid since there might be multiple chats that belong to the currentUser uid
      const q = query(
        chatsRef,
        where("users", "array-contains", currentUser.uid)
      );
      // Get all chats that belong to the currentUser uid
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setChats(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return unsubscribe;
    }
    fetchChats();
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the user clicks outside of the input element, do something
      if (inputAreaRef.current && !inputAreaRef.current.contains(e.target)) {
        console.log("Clicked outside");
        setTimeout(() => {
          setSearchFriends(false);
        }, 3000);
      } else {
        setSearchFriends(true);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);
  return (
    <div className="bg-white min-w-[320px] max-w-[450px] h-full">
      <div className="flex sticky top-0 bg-white justify-between items-center p-4 h-[80px] border-b border-b-white w-full">
        <Avatar
          className="cursor-pointer hover:opacity:0.8"
          src={currentUser.photoURL}
        />
        <div>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
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
      <div className="bg-[#f6f6f6] border-b border-b-black/10 p-5">
        <div className="flex p-[5px] rounded-md border-b border-b-[#ededed] bg-white">
          <Search />
          <input
            className="w-full outline-none border-none"
            ref={inputAreaRef}
            placeholder="Search or start new chat"
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
            <Chats key={chat.id} chat={chat} />
          ))}
        </>
      )}
    </div>
  );
}

export default Sidebar;
