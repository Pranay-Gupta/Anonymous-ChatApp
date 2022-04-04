import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Paper,
  Grid,
  TextField,
  Avatar,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialData = {
    name: "",
    room: "",
  };
  const [formData, setFormData] = useState(initialData);

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (formData.name && formData.room)
      navigate(`/chat/${formData.name}/${formData.room}`);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        sx={{
          mt: "20vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",

          p: 2,
        }}
      >
        <Typography variant="h4" color="initial">
          Welcome to Anonymous
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          sx={{ mt: 2 }}
          flexDirection="column"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Enter a username to join"
                onChange={handleForm}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="room"
                label="Enter a room name"
                onChange={handleForm}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Join Room
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
