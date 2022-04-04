import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

function Users({ users, message, setMessage }) {
  const handleClick = (user) => {
    setMessage(message + `@ ${user.name} `);
  };
  return (
    <>
      <Box sx={{ textAlign: "center", width: 250 }}>
        {users?.map((user, i) => (
          <Typography
            key={i}
            onClick={() => {
              handleClick(user);
            }}
            sx={{
              p: 1,
              color: "black",
              ":hover": {
                cursor: "pointer",
                bgcolor: "#ffe0b2",
              },
            }}
          >
            {user.name}
          </Typography>
        ))}
      </Box>
    </>
  );
}

export default Users;
