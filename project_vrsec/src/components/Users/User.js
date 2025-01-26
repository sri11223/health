import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {users.map((user) => (
        <Grid item key={user._id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2">{user.email}</Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={/user/${user._id}}
                sx={{ marginTop: 2 }}
              >
                More Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Users;