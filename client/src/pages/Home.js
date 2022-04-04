import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import HomeIcon from "@mui/icons-material/Home";
import HomeBottom from "../components/HomeBottom";
import Chats from "../components/Chats";

import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

let socket;

function Chat() {
  let initialFeatures = {
    bold: false,
    italics: false,
    strike: false,
    link: false,
    file: false,
  };
  const { name, room } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(null);

  const [features, setFeatures] = useState(initialFeatures);
  const navigate = useNavigate();

  useEffect(() => {
    socket = io(URL);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        navigate("/");
      }
    });
  }, [URL]);
  useEffect(() => {
    socket.on("message", (message) => setMessages([...messages, message]));

    socket.on("roomData", ({ users }) => setUsers(users));
  }, [messages, users]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { message, features }, () => {
        setFeatures(initialFeatures);
        setMessage("");
      });
    }
  };
  const logout = () => {
    socket.disconnect();
    navigate("/");
  };
  return (
    <Container maxWidth="xl" sx={{ mt: 3, height: "90vh" }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Sidebar room={room} users={users} />
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ height: "90vh" }}>
            <Box
              display="flex"
              sx={{
                justifyContent: "flex-end",

                p: 1,
                bgcolor: "#ffa726",
              }}
            >
              <Button variant="contained" onClick={logout}>
                Leave
              </Button>
            </Box>

            <Chats
              messages={messages}
              name={name}
              features={features}
              room={room}
            />
            <HomeBottom
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              features={features}
              setFeatures={setFeatures}
              users={users}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
