import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';
import { css } from '@emotion/core';

const overHead = css`
  height: 60vh;
  display: block;
  margin: 30vh auto 10vh auto;
  grid-column: 1/4;
`;

function Repositories(props) {
    const [activity, setActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("https://api.github.com/users/" + props.userName + "/repos?per_page=100", {
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                setActivity(res.data);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const getRepo = (res) => {
        var createdAt = new Date(res.created_at);
        createdAt = createdAt.toUTCString().slice(0, 16);
        return (
            <><>
                <h6 className="repo-name">
                    <Link to={{ pathname: `/${props.userName}/${res.name}`, state: res}}>
                        {res.name}{res.fork ? '(Forked)' : ''}
                    </Link>
                </h6>
            </></>
        )
    }

    if (isLoading === true) {
        return (
            <PuffLoader color="#333" css={overHead} loading={isLoading} />
        );
    }
    else {
        return (
            <>
                <div className="repo-scroll" id="act-scrollbar">
                    {
                        activity.map(res => {
                            return (
                                <div className="repo-detail" key={res.id}>
                                    {
                                        getRepo(res)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default Repositories; 