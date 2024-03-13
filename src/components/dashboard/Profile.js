import React from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';

function ProfileOverview(props) {
    const { login, name, avatar_url, bio, company, location, created_at, html_url, blog } = props.profile;

    const openGitHub = () => {
        window.open(html_url, '_blank');
    };

    const openWebsite = () => {
        if (!isValidUrl(blog)) {
            console.error('Invalid URL for blog:', blog);
            const urlWithProtocol = addProtocol(blog);
            window.open(urlWithProtocol, '_blank');
        } else {
            window.open(blog, '_blank');
        }
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const addProtocol = (url) => {
        return `https://${url}`;
    };

    return (
        <Box display="flex" alignItems="center" flexDirection="column" p={2}>
            {avatar_url && <Avatar src={avatar_url} alt="logo" sx={{ width: 100, height: 100, mb: 2 }} />}
            <Box textAlign="center">
                {name && <Typography variant="h5">{name}</Typography>}
                {login && (
                    <Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa fa-github" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                        {login}
                        {location && <span className="subheading" style={{ marginLeft: '5px' }}> based in {location}</span>}
                    </Typography>
                )}
                {bio && <Typography variant="body1">{bio}</Typography>}
                {company && <Typography variant="body1">{company}</Typography>}
            </Box>
            {created_at && <Typography variant="body2">Joined On {new Date(created_at).toDateString()}</Typography>}
            <Box mt={2} display="flex" justifyContent="center">
                <Button onClick={openGitHub} variant="contained" color="primary" sx={{ mr: 2 }}>
                    GitHub
                </Button>
                {blog ? (
                    <Button onClick={openWebsite} variant="contained" color="primary">
                        Website
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" disabled>
                        Website
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default ProfileOverview;
