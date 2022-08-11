import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import messages from "../data/messages";
import Message from "./Message";
function ChatContent({ chat, chat_id }) {
  const [friend, setFriend] = useState({});
  const chatParse = JSON.parse(chat);

  useEffect(() => {

  }, [chat_id]);

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInfo>
          <h3>Emma</h3>
          <div>Last Active: 3 hours ago</div>
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
        <Input placeholder="Type a message" />
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
