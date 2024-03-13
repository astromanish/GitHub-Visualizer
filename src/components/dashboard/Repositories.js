import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';

const overHeadStyles = {
  height: '60vh',
  display: 'block',
  margin: '30vh auto 10vh auto',
  gridColumn: '1/4'
};

function Repositories(props) {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${props.userName}/repos?per_page=100`, {
      headers: {
        authorization: `Bearer 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`
      }
    })
      .then(res => {
        setActivity(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

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

  if (isLoading === true) {
    return (
      <PuffLoader color="#333" style={overHeadStyles} loading={isLoading} />
    );
  } else {
    return (
      <div className="repo-scroll" id="act-scrollbar">
        {activity.map(res => (
          <div className="repo-detail" key={res.id}>
            {getRepo(res)}
          </div>
        ))}
      </div>
    );
  }
}

export default Repositories;
