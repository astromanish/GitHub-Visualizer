import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, TextField, Button, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
// import env from "react-dotenv";

function Search() {
    const [userName, setUserName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        try {
            console.log(process.env.API_KEY);
            const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
                headers: {
                    // Authorization: `Bearer ${env.API_KEY}`
                }
            });
            const users = response.data.items.slice(0, 3); // Limit to 3 suggestions
            setSuggestions(users);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    useEffect(() => {
        if (userName.trim() !== '') {
            fetchSuggestions(userName);
        } else {
            setSuggestions([]);
        }
    }, [userName]);

    const handleInputChange = (event) => {
        setUserName(event.target.value);
    };

    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#808080' }}>
            <Container sx={{ height: '100%'}}>
                <Grid container justifyContent="center" alignItems="center" height="100%">
                    <Grid item xs={12} sm={4} sx={{ backgroundColor: 'white', paddingTop: '120px', paddingBottom: '120px', borderRadius: '20px', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', marginTop: '20px'}}>
                        <GitHubIcon sx={{ fontSize: 64, color: '#424242' }} />
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: 64, fontFamily: '"Style Script", cursive', fontWeight: 400, fontStyle: 'normal', color: '#424242' }}>
                            activities
                        </Typography>
                        <TextField
                            fullWidth
                            value={userName}
                            onChange={handleInputChange}
                            label="Enter GitHub Username"
                            variant="outlined"
                            margin="normal"
                        />
                        <List>
                            {suggestions.map((user) => (
                                <ListItem key={user.id} button component="a" href={user.html_url} target="_blank" sx={{ border: '1.3px solid #808080', borderRadius: '5px', marginBottom: '5px' }}>
                                    <ListItemAvatar>
                                        <Avatar alt={user.login} src={user.avatar_url} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.login} />
                                </ListItem>
                            ))}
                        </List>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Link to={`/${userName}`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" size="large" sx={{ backgroundColor: '#424242', borderRadius: '20px' }}>
                                    Let's Go!
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Search;
