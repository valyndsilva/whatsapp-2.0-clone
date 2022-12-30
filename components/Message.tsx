import moment from "moment";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

function Message({ user, message, timestamp }) {
  const { currentUser } = useAuth();
  const loginMail = currentUser.email;

  return (
    <div className="flex">
      <div
        className={`p-4 pb-7 text-right bg-white mb-2 relative min-w-[80px] ${
          user === loginMail
            ? "ml-auto bg-[#dcf8c6] rounded-b-lg rounded-l-lg after:contents"
            : "bg-white text-left rounded-b-lg rounded-r-lg"
        }`}
      >
        {message}
        <span className="text-gray-500 p-2 text-xs absolute bottom-0 text-right right-0">
          {moment(timestamp).format("LT")}
        </span>
      </div>
    </div>
  );
}

export default Message;
