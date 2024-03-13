import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Box, Button } from '@mui/material';
import PuffLoader from 'react-spinners/PuffLoader';

function Repositories(props) {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${props.userName}/repos?per_page=10&page=${pageNo}`, {
      headers: {
        authorization: `Bearer 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`
      }
    })
      .then(res => {
        setActivity(res.data);
        setIsLoading(false);
        setMaxPage(Math.ceil(props.stats.repo / 10));
      })
      .catch(err => console.log(err));
  }, [props.userName, pageNo, props.stats.repo]);
  

  const getRepo = (res) => {
    const createdAt = new Date(res.created_at);
    const formattedDate = createdAt.toUTCString().slice(0, 16);
    return (
      <h6 className="repo-name">
        <Link to={{ pathname: `/${props.userName}/${res.name}`, state: res }}>
          {res.name}{res.fork ? '(Forked)' : ''}
        </Link>
      </h6>
    );
  };

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

  if (isLoading === true) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  } else {
    return (
      <>
        <div className="repo-scroll" id="act-scrollbar">
          {activity.map(res => (
            <div className="repo-detail" key={res.id} style={{ width: '100%' }}>
              {getRepo(res)}
            </div>
          ))}
        </div>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={handlePrevPage} disabled={pageNo === 1} variant="contained" style={{ marginRight: '8px' }}>Prev</Button>
          <Button onClick={handleNextPage} disabled={pageNo === maxPage} variant="contained" style={{ marginLeft: '8px' }}>Next</Button>
        </Box>
      </>
    );
  }
}

export default Repositories;
