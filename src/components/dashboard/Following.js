import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Button } from '@mui/material';
import {fetchGithubUserFollowings} from './../utils/githubApiUtils'; 


function Following(props) {
  const [followings, setFollowings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    if (pageNo < 1) {
      setPageNo(1);
    } else {
      const fetchData = async () => {
        setIsLoading(true);
        const { followings, error } = await fetchGithubUserFollowings(props.userName, pageNo);
        if (!error) {
          setFollowings(followings);
        }
        setIsLoading(false);
      };

      fetchData();
    }

    // Calculate maxPage based on stats.following
    setMaxPage(Math.ceil(props.stats.following / 20));
  }, [pageNo, props.stats.following, props.userName]);

  const handlePrevPage = () => {
    if (pageNo !== 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNo !== maxPage) {
      setPageNo(pageNo + 1);
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
          {
            followings.map(res => (
              <Box key={res.id} className="f-details" width="100%" display="flex" alignItems="center" mb={2}>
                <img src={res.avatar_url} alt="logo" className="f-logo" />
                <span className="f-username" style={{ flex: 1 }}>
                  <Button component={Link} to={`/${res.login}`} className="cool-link">
                    {res.login}
                  </Button>
                </span>
              </Box>
            ))
          }
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={handlePrevPage} disabled={pageNo === 1} variant="contained" style={{ marginRight: '8px' }}>Prev</Button>
          <Button onClick={handleNextPage} disabled={pageNo === maxPage} variant="contained" style={{ marginLeft: '8px' }}>Next</Button>
        </Box>
      </>
    );
  }
}

export default Following;
