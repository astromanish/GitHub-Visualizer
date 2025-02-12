import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Button } from '@mui/material';
import { FileCopyOutlined } from '@mui/icons-material';
import {fetchGithubUserRepos} from './../utils/githubApiUtils'; 


function Repositories(props) {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1); // Assume pageNo is managed within this component
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { repos, error } = await fetchGithubUserRepos(props.userName, pageNo);
      if (!error) {
        setActivity(repos);
        setIsLoading(false);
        // Assuming `props.stats.repo` is the total count of repositories
        setMaxPage(Math.ceil(props.stats.repo / 10));
      } else {
        console.log(error); // Or handle the error as appropriate
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.userName, pageNo, props.stats.repo]);

  const getRepo = (res) => {
    const createdAt = new Date(res.created_at);
    return (
      <div className="repo-item" key={res.id}>
        <h6 className="repo-name">
          <Link to={{ pathname: `/${props.userName}/${res.name}`, state: res }}>
            {res.name}{res.fork ? ' (forked)' : ''}
          </Link>
        </h6>
        <div className="repo-actions">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(res.clone_url);
            }}
            startIcon={<FileCopyOutlined />}
          >
            Copy CLONE URL
          </Button>
        </div>
      </div>
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
