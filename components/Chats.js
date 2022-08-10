import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
function Chats({ photoURL, name, timestamp, latestMessage }) {
  const router = useRouter();
  const enterChat = () => {
    router.push(`/chat/123`);
  };
  return (
    <Container onClick={enterChat}>
      <FrndAvatar src={photoURL} />
      <ChatContainer>
        <div style={{ gridArea: "name" }}>{name}</div>
        <div style={{ gridArea: "time", fontSize: "14px" }}>
          {moment(timestamp.seconds * 1000).format("LT")}
        </div>
        <div style={{ gridArea: "latest_message" }}>{latestMessage}</div>
      </ChatContainer>
    </Container>
  );
}

export default Chats;

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

const ChatContainer = styled.div`
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
