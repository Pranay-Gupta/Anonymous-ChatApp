import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import { LinkPreview } from "@dhaiwat10/react-link-preview";
function Chat({ message, name }) {
  const styles = {
    messageSentBox: {
      mt: 1.5,
      mb: 1.5,
      ml: "auto",
      bgcolor: "#ffb74d",
      // minWidth: "fit-content",
      maxWidth: "80%",

      p: 1,
      borderRadius: "10px 0 10px 10px",
      position: "relative",
      ...(message.features?.link && {
        bgcolor: "transparent",
      }),
    },
    messageStyles: {
      ...(message?.features?.bold && {
        fontWeight: "bold",
      }),
      ...(message?.features?.italics && {
        fontStyle: "italic",
      }),
      ...(message?.features?.strike && {
        textDecoration: "line-through",
      }),
    },
    senderName: {
      position: "absolute",
      top: "-15px",
      fontWeight: "800",
      fontSize: "x-small",
    },
    messageRecieveBox: {
      mt: 1.5,
      mb: 1.5,
      maxWidth: "80%",
      bgcolor: "#ffe0b2",
      width: "fit-content",
      ...(message.features?.link && {
        bgcolor: "transparent",
      }),
      p: 1,
      borderRadius: "0px 10px 10px 10px",
      position: "relative",
    },
  };

  let isSentByCurrentUser = false;

  if (message.user === name.trim()) {
    isSentByCurrentUser = true;
  }

  // if (message.user === "pseudo")
  //   return (
  //     <Collapse in={open}>
  //       <Alert
  //         action={
  //           <IconButton
  //             aria-label="close"
  //             color="inherit"
  //             size="small"
  //             onClick={() => {
  //               setOpen(false);
  //             }}
  //           >
  //             <CloseIcon fontSize="inherit" />
  //           </IconButton>
  //         }
  //         sx={{ mb: 2 }}
  //       >
  //         {message.text}
  //       </Alert>
  //     </Collapse>
  //   );

  return (
    <>
      {isSentByCurrentUser ? (
        <Box sx={styles.messageSentBox}>
          <Typography variant="body1" color="black" sx={styles.senderName}>
            You
          </Typography>

          {message.features.link ? (
            <LinkPreview url={message.text} width="400px">
              {message.text}
            </LinkPreview>
          ) : (
            <Typography variant="body1" color="black" sx={styles.messageStyles}>
              {message.text}
            </Typography>
          )}
        </Box>
      ) : (
        <Box sx={styles.messageRecieveBox}>
          <Typography variant="body1" color="black" sx={styles.senderName}>
            {message.user}
          </Typography>

          {message.features?.link ? (
            <LinkPreview url={message.text} width="400px">
              {message.text}
            </LinkPreview>
          ) : (
            <Typography variant="body1" color="black" sx={styles.messageStyles}>
              {message.text}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

export default Chat;
