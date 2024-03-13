import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './Overview';
import CommitList from './contributions';
import Footer from '../Footer';
import axios from 'axios';

const Repository = () => {
    const { user_id, repo_id } = useParams();
    const [repoData, setRepoData] = useState(null);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const response = await axios.get(`https://api.github.com/repos/${user_id}/${repo_id}`, {
                    headers: {
                        Authorization: `Bearer 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`
                    }
                });
                setRepoData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching repository data:', error);
            }
        };

        fetchRepoData();
    }, [user_id, repo_id]);

    return (
        <>
            {repoData && (
                <>
                    <Overview repoData={repoData} />
                    <CommitList repoData={repoData} />
                    <Footer/>
                </>
            )}
        </>
    );
}

export default Repository;
