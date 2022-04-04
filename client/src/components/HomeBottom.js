import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  InputBase,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import clsx from "clsx";

import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddIcon from "@mui/icons-material/Add";
import CodeIcon from "@mui/icons-material/Code";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import Pop from "./Pop";
import EmojiSelector from "./EmojiSelector";
import Users from "./Users";
import NumberdList from "./NumberdList";

function HomeBottom({
  message,
  setMessage,
  sendMessage,
  users,
  features,
  setFeatures,
}) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(null);

  const styles = {
    inputStyles: {
      px: 1,
      color: "black",
      overflow: "auto",
      input: {
        bgcolor: "#fff3e0",
        p: 1,
      },
      ...(features.bold && {
        fontWeight: "bold",
      }),
      ...(features.italics && {
        fontStyle: "italic",
      }),
      ...(features.strike && {
        textDecoration: "line-through",
      }),
    },

    selectedButton: { bgcolor: "#ffa726", ":hover": { bgcolor: "#ffa726" } },
    modalStyles: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
  };
  const boldText = () => {
    setFeatures({ ...features, bold: !features.bold });
  };
  const italicText = () => {
    setFeatures({ ...features, italics: !features.italics });
  };
  const strikeText = () => {
    setFeatures({ ...features, strike: !features.strike });
  };
  const linkText = async (e) => {
    console.log("inside link");
    await setFeatures({ ...features, link: true });
    setMessage(link);
    sendMessage(e);
    handleClose();
    setLink(null);
  };
  //File Handling

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setMessage(fileUploaded?.name);
    sendMessage(event);
  };

  //Modal handle

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ bgcolor: "#ffe0b2" }}>
      <ButtonGroup variant="text">
        <Tooltip title="Bold">
          <Button
            onClick={boldText}
            sx={{
              ...(features.bold && styles.selectedButton),
            }}
          >
            <FormatBoldIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Italics">
          <Button
            onClick={italicText}
            sx={{
              ...(features.italics && styles.selectedButton),
            }}
          >
            <FormatItalicIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Strike-through">
          <Button
            onClick={strikeText}
            sx={{
              ...(features.strike && styles.selectedButton),
            }}
          >
            <StrikethroughSIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Link">
          <Button onClick={handleOpen}>
            <InsertLinkIcon />
          </Button>
        </Tooltip>
        <Button sx={{ p: 0 }}>
          <Pop icon={<FormatListNumberedIcon />} component={<NumberdList />} />
        </Button>
        <Button>
          <FormatListBulletedIcon />
        </Button>
        <Button>
          <AlignHorizontalLeftIcon />
        </Button>
        <Button>
          <CodeIcon />
        </Button>
      </ButtonGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalStyles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the link
          </Typography>
          <Input
            placeholder="Here..."
            fullWidth
            autoFocus
            sx={{ mt: 2, mb: 2 }}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {link && (
            <Button
              variant="contained"
              onClick={(e) => {
                linkText(e);
              }}
            >
              OK
            </Button>
          )}
        </Box>
      </Modal>
      <form
        style={{ flex: 1, display: "flex", alignItems: "center" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputBase
          autoFocus
          placeholder="Type a message..."
          fullWidth
          onChange={(e) => setMessage(e.target.value)}
          sx={styles.inputStyles}
          value={message}
        />
        {message ? (
          <Button
            type="submit"
            onClick={(e) => sendMessage(e)}
            sx={{
              bgcolor: "#388e3c",
              display: "flex",
              justifyContent: "center",
              ":hover": {
                bgcolor: "#2e7d32",
              },
            }}
          >
            <SendIcon
              sx={{
                color: "white",
              }}
              fontSize="medium"
            />
          </Button>
        ) : (
          ""
        )}
      </form>
      <ButtonGroup variant="text">
        <Tooltip title="Upload file">
          <Button onClick={handleClick}>
            <AddIcon />
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </Button>
        </Tooltip>
        <Tooltip title="Emoji">
          <Button sx={{ p: 0 }}>
            <Pop
              icon={<InsertEmoticonIcon />}
              component={
                <EmojiSelector message={message} setMessage={setMessage} />
              }
            />
          </Button>
        </Tooltip>
        <Tooltip title="Mention">
          <Button sx={{ p: 0 }}>
            <Pop
              icon={<AlternateEmailIcon />}
              component={
                <Users
                  users={users}
                  message={message}
                  setMessage={setMessage}
                />
              }
            />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
}

export default HomeBottom;
