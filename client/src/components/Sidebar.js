import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
function Sidebar({ room, users }) {
  return (
    <Box
      sx={{
        bgcolor: "#ffa726",
        height: "91vh",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          color="black"
          sx={{
            mt: 10,
            display: "flex",
            alignItems: "center",
          }}
          gutterBottom
        >
          <HomeIcon sx={{ color: "white", mr: 4, height: 30, width: 30 }} />
          Room Name
        </Typography>
        <Paper sx={{ p: 0.5, mb: 1 }}>
          <Typography variant="body1" color="black" gutterBottom>
            {room}
          </Typography>
        </Paper>
        <Typography variant="body1" color="black" gutterBottom>
          Invite others by sharing above room name!
        </Typography>
        <Box sx={{ mt: 5 }}>
          <Typography
            variant="h4"
            color="black"
            sx={{ mt: 1, display: "flex", alignItems: "center" }}
            gutterBottom
          >
            <GroupIcon sx={{ color: "white", mr: 10, height: 30, width: 30 }} />
            Users
          </Typography>
          {users?.map((user) => (
            <Paper sx={{ p: 0.5, mb: 1 }}>
              <Typography variant="body1" color="black" gutterBottom>
                {user.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
