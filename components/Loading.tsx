import React from "react";
import { Grid } from "@mui/material";
import ReactLoading from "react-loading";
function Loading({ type, color }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundColor: "whitesmoke" }}
    >
      <img
        src="/assets/whatsapp-home.png"
        alt="Whatsapp Logo"
        height={250}
        width={250}
        className="object-contain"
      />
      <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
    </Grid>
  );
}

export default Loading;
