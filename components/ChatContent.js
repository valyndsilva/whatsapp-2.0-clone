import { MoreVert, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";

function ChatContent() {
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
    </Container>
  );
}

export default ChatContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
