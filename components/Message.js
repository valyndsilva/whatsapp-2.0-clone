import moment from "moment";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

function Message({ user, message, timestamp }) {
  const { currentUser } = useAuth();
  const loginMail = currentUser.email;
  const MessageType = user === loginMail ? MyMessage : FrndMessage;

  return (
    <Container>
      {user !== loginMail && <MessageTailLeft />}
      <MessageType>
        {message}
        <Timestamp>{moment(timestamp).format("LT")}</Timestamp>
      </MessageType>
      {user == loginMail && <MessageTailRight />}
    </Container>
  );
}

export default Message;

const Container = styled.div`
  display: flex;
`;

const MessageBubble = styled.div`
  padding: 15px;
  padding-bottom: 26px;
  text-align: right;
  background-color: #fff;
  margin-bottom: 10px;
  position: relative;
`;

const MyMessage = styled(MessageBubble)`
  margin-left: auto;
  background-color: #dcf8c6;
  border-radius: 8px 0 8px 8px;
`;

const FrndMessage = styled(MessageBubble)`
  background-color: #fff;
  text-align: left;
  border-radius: 0 8px 8px 8px;
`;

const MessageTailLeft = styled.span`
  position: absolute;
  :after {
    content: "";
    position: absolute;
    border: 12px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    border-top: 0;
    margin-top: 0px;
    margin-left: -12px;
  }
`;

const MessageTailRight = styled.span`
  :after {
    content: "";
    position: absolute;
    border: 12px solid transparent;
    border-left-color: #dcf8c6;
    border-right: 0;
    border-top: 0;
    margin-top: -0px;
    margin-right: -12px;
  }
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
