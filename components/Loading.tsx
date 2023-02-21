import React from "react";
import { Grid } from "@mui/material";
import ReactLoading from "react-loading";
import Image from "next/image";
function Loading({ type, color }) {
  const loaderProp = ({ src }) => {
    return src;
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundColor: "whitesmoke" }}
    >
      <Image
        src="/assets/whatsapp-home.png"
        alt="Whatsapp Logo"
        height={250}
        width={250}
        className="object-contain"
        loader={loaderProp}
      />
      <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
    </Grid>
  );
}

export default Loading;
