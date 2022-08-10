import React from "react";
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

function Sidebar() {
  console.log(chats.map((chat, index) => chat.latestMessage));
  return (
    <Container>
      <Header>
        <UserAvatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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
          <SearchInput placeholder="Search or start new chat" />
        </SearchBar>
      </SearchChat>
      {chats.map((chat, index) => (
        <Chats
          key={index}
          name={chat.name}
          photoURL={chat.photoURL}
          latestMessage={chat.latestMessage}
          timestamp={chat.timestamp}
        />
      ))}
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
