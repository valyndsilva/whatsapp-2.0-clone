import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { ChatContent } from "../../components";
import { db } from "../../firebaseConfig";

function ChatBox({ chat, id, messages }) {
  return (
    <Container>
      <ChatContainer>
        <ChatContent chat={chat} chat_id={id} messagesProps={messages} />
      </ChatContainer>
    </Container>
  );
}

export default ChatBox;

export async function getServerSideProps(context) {
  // Server side rendering of the messages
  const messagesRef = collection(db, "chats", context.query.id, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));
  const querySnapshot = await getDocs(q);

  const messages = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    timestamp: doc.data().timestamp?.toDate().getTime(),
  }));

  // Server side rendering of the chats
  // Get the params chat id from the url and select that chat id from the chats collection document.
  const docRef = doc(db, "chats", context.query.id);
  const docSnap = await getDoc(docRef);
  const chat = JSON.stringify(docSnap.data());
  return {
    props: {
      chat: chat,
      id: context.query.id,
      messages: JSON.stringify(messages),
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
