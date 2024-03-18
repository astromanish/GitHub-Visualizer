import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';
import {fetchGithubUserFollowers} from './../utils/githubApiUtils'; 


function Followers(props) {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1); // Assume pageNo is managed within this component

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { followers, error } = await fetchGithubUserFollowers(props.userName, pageNo);
            if (!error) {
                setFollowers(followers);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [props.userName, pageNo]);

  const maxPage = Math.ceil(props.stats.followers / 20);

  const handleNextPage = () => {
    if (pageNo < maxPage) {
      setPageNo(pageNo + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  } else {
    return (
      <>
        <Box display="flex" flexDirection="column" alignItems="center" className="repo-scroll" id="act-scrollbar">
          {followers.map(res => (
            <Box key={res.id} className="f-details" width="100%" display="flex" alignItems="center" mb={2}>
              <img src={res.avatar_url} alt="logo" className="f-logo" />
              <span className="f-username" style={{ flex: 1 }}>
                <Button component={Link} to={`/${res.login}`} className="cool-link">
                  {res.login}
                </Button>
              </span>
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={handlePrevPage} disabled={pageNo === 1} variant="contained" style={{ marginRight: '8px' }}>Prev</Button>
          <Button onClick={handleNextPage} disabled={pageNo === maxPage} variant="contained" style={{ marginLeft: '8px' }}>Next</Button>
        </Box>
      </>
    );
  }
}

export default Followers;
