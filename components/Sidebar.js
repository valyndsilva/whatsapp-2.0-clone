import React from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@mui/material";
import { Chat, DonutLarge, MoreVert, Search } from "@mui/icons-material";
import { BasicMenu } from ".";

function Sidebar() {
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
      <SearchChat>
        <SearchBar>
          <Search />
          <SearchInput placeholder="Search or start new chat" />
        </SearchBar>
      </SearchChat>
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
