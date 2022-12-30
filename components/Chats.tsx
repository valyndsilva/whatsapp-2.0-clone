import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { SnippetFolderOutlined } from "@mui/icons-material";
import getFriendData from "../utils/getFriendData";

// function Chats({ photoURL, name, timestamp, latestMessage }) { // when using /data/chats.json
// function Chats({ chat, id, users, timestamp = "", latestMessage = "" }) {
type Props = {
  chat: ChatsData;
};
function Chats({ chat }: Props) {
  console.log(chat);
  const router = useRouter();
  const enterChat = () => {
    router.push(`/chat/${chat.id}`);
  };
  const [friend, setFriend] = useState<FriendData>();
  useEffect(() => {
    if (chat.users.length > 0) {
      getFriendData(chat.users).then((data: FriendData) => {
        setFriend(data);
      });
    }
  }, [chat.users]);

  return (
    <div
      className="flex items-center cursor-pointer min-h-[67px] pl-4 break-words hover:bg-[#f5f5f5]  border-b border-b-[#ededed]"
      onClick={enterChat}
    >
      <Avatar className="m-[5px] mr-4" src={friend?.photoURL} />
      <div className="flex flex-col">
        <div className="grid grid-cols-4 w-full">
          <div className="col-span-3">{friend?.displayName}</div>
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
