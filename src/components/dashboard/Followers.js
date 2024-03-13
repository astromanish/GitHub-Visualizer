import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';

function Followers(props) {
  const [followers, setFollowers] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.github.com/users/${props.userName}/followers?page=${pageNo}&per_page=30`);
        setFollowers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching followers:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNo, props.userName]);

  const maxPage = Math.ceil(props.stats.followers / 30);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  } else {
    return (
      <>
        <Box display="flex" flexDirection="column" alignItems="center">
          {followers.map(res => (
            <Box key={res.id} className="f-details" width="100%" display="flex" alignItems="center" mb={2}>
              <img src={res.avatar_url} alt="logo" className="f-logo" />
              <span className="f-username" style={{ flex: 1 }}>
                <Button component={Link} to={`/${res.login}`} className="cool-link">
                  {res.login} <i className="fa fa-location-arrow" aria-hidden="true"></i>
                </Button>
              </span>
            </Box>
          ))}
        </Box>
      </>
    );
  }
}

export default Followers;
