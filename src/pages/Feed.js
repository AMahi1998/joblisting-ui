import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${query}`);
      setPost(response.data);
    };

    const fetchInitialPosts = async () => {
      const response = await axios.get("http://localhost:8080/allPosts");
      setPost(response.data);
    };

    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Button sx={{ marginBottom: "1rem" }} variant="outlined" component={Link} to="/">
        Home
      </Button>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <TextField
          placeholder="Search..."
          sx={{ width: "50%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>

      <Grid container spacing={3}>
        {post.map((p, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              boxShadow: 5,
              borderRadius: 4,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.03)' }
            }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>{p.profile}</Typography>
                <Typography variant="body1" color="text.secondary">
                  Description: {p.desc}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px" }}>
                  Years of Experience: {p.exp} years
                </Typography>
                <Typography variant="subtitle2" sx={{ marginTop: "10px" }}>
                  Skills: {p.techs.join(", ")}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" fullWidth>Apply Now</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed;
