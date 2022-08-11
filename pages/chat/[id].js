import { doc, getDoc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { ChatContent } from "../../components";
import { db } from "../../firebaseConfig";

function ChatBox({ chat, id }) {
  return (
    <Container>
      <ChatContainer>
        <ChatContent chat={chat} chat_id={id}/>
      </ChatContainer>
    </Container>
  );
}

export default ChatBox;

export async function getServerSideProps(context) {
  // Get the params chat id from the url and select that chat id from the chats collection document.
  const docRef = doc(db, "chats", context.query.id);
  const docSnap = await getDoc(docRef);
  const chat = JSON.stringify(docSnap.data());
  return {
    props: {
      chat: chat,
      id: context.query.id,
    },
  };
}
const Container = styled.div`
  display: flex;
  background-color: #f8fafc;
  width: 100%;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  max-height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
