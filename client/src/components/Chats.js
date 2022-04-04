import { Box, Typography } from "@mui/material";
import React from "react";
import Chat from "./Chat";

function Chats({ messages, name, features, room }) {
  const styles = {
    chatBody: {
      display: "flex",
      flex: 1,
      p: 5,
      overflow: "auto",
      flexDirection: "column",
      bgcolor: "#fff3e0",
      height: "65vh",
    },
  };
  return (
    <Box sx={styles.chatBody}>
      {messages?.map((message, i) => (
        <Chat key={i} message={message} name={name} features={features} />
      ))}
    </Box>
  );
}

export default Chats;
