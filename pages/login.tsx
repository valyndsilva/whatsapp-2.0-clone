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
    <div className="grid place-items-center h-[100vh] w-[100vw] bg-[#009688] ">
      <div className="p-8 flex gap-5 bg-white rounded-xl">
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
      </div>
    </div>
  );
}

export default login;
