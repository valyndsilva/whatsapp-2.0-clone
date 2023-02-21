import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { SnippetFolderOutlined } from "@mui/icons-material";
import getFriendData from "../utils/getFriendData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuth } from "../context/AuthContext";

// function Chats({ photoURL, name, timestamp, latestMessage }) { // when using /data/chats.json
// function Chats({ chat, id, users, timestamp = "", latestMessage = "" }) {
type Props = {
  chat: ChatsData;
  users: any[];
};
function Chats({ chat, users }: Props) {
  console.log({ chat });
  console.log({ users });
  const router = useRouter();

  const enterChat = () => {
    router.push(`/chat/${chat.id}`);
  };

  const [friend, setFriend] = useState<FriendData>();

  useEffect(() => {
    if (chat.users.length > 0) {
      getFriendData(chat.users).then((data: FriendData) => {
        console.log("getFriendData:", data);
        setFriend(data);
        console.log(friend);
      });
    }
  }, [chat.users]);

  const [recipientSnapshot, setRecipientSnapshot] = useState([]);
  const { currentUser } = useAuth();
  const user = currentUser;
  console.log({user});
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
  }, []);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  console.log({recipient});
  const recipientEmail = getRecipientEmail(users, user);
  // console.log({ recipientEmail });

  return (
    <div
      className="flex items-center cursor-pointer min-h-[67px] pl-4 break-words hover:bg-[#f5f5f5]  border-b border-b-[#ededed]"
      onClick={enterChat}
    >
      <Avatar className="m-[5px] mr-4" src={recipient?.photoURL} />
      <div className="flex flex-col">
        <div className="grid grid-cols-4 w-full">
          <div className="col-span-3">{recipient?.displayName}</div>
          <div className="col-span-1 text-sm">
            {chat.timestamp
              ? moment(chat.timestamp?.toDate()).format("LT")
              : ""}
          </div>
        </div>
        <div className="">{chat.latestMessage}</div>
      </div>
    </div>
  );
}

export default Chats;
