import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, TextField, Button, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Search() {
    const [userName, setUserName] = useState('');

    const changeUsername = (e) => {
        setUserName(e.target.value);
    }

    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#808080' }}>
            <Container sx={{ height: '100%' }}>
                <Grid container justifyContent="center" alignItems="center" height="100%">
                    <Grid item xs={12} sm={4} sx={{ backgroundColor: 'white', paddingTop: '120px', paddingBottom: '120px', borderRadius: '20px', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center' }}>
                        <GitHubIcon sx={{ fontSize: 64, color: '#424242' }} />
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: 64, fontFamily: '"Style Script", cursive', fontWeight: 400, fontStyle: 'normal', color: '#424242' }}>
                            Activities
                        </Typography>
                        <form>
                            <TextField
                                fullWidth
                                value={userName}
                                onChange={changeUsername}
                                label="Enter Github Username"
                                variant="outlined"
                                margin="normal"
                            />
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Link to={'/' + userName} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" size="large" sx={{ backgroundColor: '#424242' }}>
                                        Let's Go!
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Search;
