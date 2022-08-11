import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@mui/material";
import {
  ArrowForwardIos,
  Chat,
  DonutLarge,
  NotificationsOff,
  Search,
} from "@mui/icons-material";
import { BasicMenu, Chats } from ".";
import chats from "../data/chats";
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

function Sidebar() {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const inputAreaRef = useRef(null);
  const [searchFriends, setSearchFriends] = useState(false);

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
    <Container>
      <Header>
        <UserAvatar src={currentUser.photoURL} />
        <IconsGroup>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <BasicMenu />
        </IconsGroup>
      </Header>
      <Notification>
        <NotificationAvatar>
          <NotificationsOff style={{ color: "#9DE1FE" }} />
        </NotificationAvatar>
        <NotificationText>
          <div>Get Notified Of New Messages</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href="">
              <u>Turn on desktop notifications</u>
            </a>
            <IconButton>
              <ArrowForwardIos style={{ width: 10, height: 10 }} />
            </IconButton>
          </div>
        </NotificationText>
      </Notification>
      <SearchChat>
        <SearchBar>
          <Search />
          <SearchInput
            ref={inputAreaRef}
            placeholder="Search or start new chat"
          />
        </SearchBar>
      </SearchChat>
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
          {friends.map((friend) => (
            <Friend
              key={friend.id}
              id={friend.id}
              displayName={friend.displayName}
              photoURL={friend.photoURL}
            />
          ))}
        </>
      ) : (
        <>
          {/* Display chat items for the chats that belong to the currentUser */}
          {chats.map((chat) => (
            <Chats
              key={chat.id}
              id={chat.id}
              users={chat.users}
              latestMessage={chat.latestMessage}
              timestamp={chat.timestamp}
            />
          ))}
        </>
      )}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background-color: #fff;
  min-width: 320px;
  max-width: 450px;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  width: 100%;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsGroup = styled.div``;

const SearchChat = styled.div`
  background-color: #f6f6f6;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 10px;
  border-bottom: 1px solid #ededed;
  background-color: #fff;
`;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
`;

const Notification = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #9de1fe;
`;

const NotificationAvatar = styled(Avatar)`
  background-color: #fff;
`;

const NotificationText = styled.div`
  display: flex;
  flex-direction: column;
`;
