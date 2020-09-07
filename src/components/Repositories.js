import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Repositories(props) {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        axios.get("https://api.github.com/users/" + props.userName + "/repos",{
            headers: {
                authorization: `token ${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res => {
                setActivity(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const getRepo = (res) => {
        return(
            <><>
                <a href={res.svn_url} className="repo-name"><div >{res.name} <i className="fa fa-github-alt" aria-hidden="true"></i></div></a>
                <a href={res.html_url} className="repo-more"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                <div className="repo-desc">{res.description}</div>
                <div className="repo-forks">Forks: {res.forks}</div>
                <div className="repo-stars">Stars: {res.watchers}</div>
                <div className="repo-language">{res.language}</div>
                {
                    res.homepage && <div className="repo-site"><a href={res.homepage}> View Website <i className="fa fa-sitemap" aria-hidden="true"></i></a></div>
                }
            </></>
        )
    }

    return (
        <>
            <div className="repo-scroll" id="act-scrollbar">
                {
                    activity.map(res => {
                        return(
                            <div className="repo-detail" key={res.id}>
                            {
                                res.fork == false && getRepo(res)
                            }
                            </div>
                        )
                    })
                }
                </div>
        </>
    )
}

export default Repositories; 