import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Button } from '@mui/material';

function Following(props) {
  const [followings, setFollowings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    if (pageNo < 1) {
      setPageNo(1);
    }
    axios({
      method: 'get',
      url: `https://api.github.com/users/${props.userName}/following?page=${pageNo}&per_page=30`,
      headers: {
        authorization: `Bearer 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`
      }
    }).then(function (response) {
      setFollowings(response.data);
      setIsLoading(false);
    });

    // Calculate maxPage based on stats.following
    setMaxPage(Math.ceil(props.stats.following / 30));
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
        <Box display="flex" flexDirection="column" alignItems="center">
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
