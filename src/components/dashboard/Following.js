import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';

const overHeadStyles = {
  height: '60vh',
  display: 'block',
  margin: '30vh auto 10vh auto',
  gridColumn: '1/4'
};

function Following(props) {
  const maxPage = 3;
  const [followings, setFollowings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [pageNo]);

  if (isLoading === true) {
    return (
      <PuffLoader color="#333" style={overHeadStyles} loading={isLoading} />
    );
  }
  else {
    return (
      <>
        <div className="f-div">
          {
            followings.map(res => {
              return (
                <div key={res.id} className="f-details">
                  <img src={res.avatar_url} alt="logo" className="f-logo" />
                  <span className="f-username">
                    <button onClick={() => window.location.reload()}>
                      <Link to={`/${res.login}`} className="cool-link">
                        {res.login} <i className="fa fa-location-arrow" aria-hidden="true"></i>
                      </Link>
                    </button>
                  </span>
                </div>
              )
            })
          }
        </div>
        <div className="page-button">
          <button onClick={() => {
            if (pageNo !== 1) {
              setPageNo(pageNo - 1);
            }
          }} className={pageNo === 1 ? 'btn disabled' : 'btn'}>Prev</button>
          <button onClick={() => {
            if (pageNo !== maxPage) {
              setPageNo(pageNo + 1);
            }
          }} className={pageNo === maxPage ? 'btn disabled' : 'btn'}>Next</button>
        </div>
      </>
    );
  }
}

export default Following;
