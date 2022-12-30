import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
function login() {
  const loginWithGoogle = () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider);
  };
  return (
    <Container>
      <Login>
        <Image
          alt="Whatsapp Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          height={100}
          width={100}
        />
        <Button
          onClick={loginWithGoogle}
          style={{ color: "gray" }}
          startIcon={<Google />}
        >
          Sign in with Google
        </Button>
      </Login>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: rgba(0, 150, 136);
  width: 100vw;
`;

const Login = styled.div`
  padding: 30px;
  display: flex;
  gap: 20px;
  background-color: #fff;
  border-radius: 15px;
`;
