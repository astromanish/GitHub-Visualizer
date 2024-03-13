import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Commit from './Commit';

const CommitList = (props) => {
    const [commitData, setCommitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch commit data from GitHub API
    useEffect(() => {
        axios.get(`https://api.github.com/repos/${props.repoData.owner.login}/${props.repoData.name}/commits?per_page=100`, {
            headers: {
                authorization: `Bearer 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`
            }
        })
        .then(res => {
            // Map data to temporary array
            const mappedData = res.data.map((d) => {
                const c_date = new Date(d.commit.author.date);
                console.log(c_date);
                return {
                    month: c_date.getMonth(),
                    date: c_date.getDate(),
                    year: c_date.getFullYear()
                };
            });

            // Set commitData state with mapped data
            setCommitData(mappedData);
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    }, [props.repoData])

    // Generate month-wise commit data
    const generateMonthlyCommitData = () => {
        const dateArray = [];
        
        // Populate commit counts in dateArray
        commitData.forEach((commit) => {
            const existingMonthYear = dateArray.find(date => date.year === commit.year && date.month === commit.month);
            if (existingMonthYear) {
                const existingDay = existingMonthYear.days.find(day => day.date === commit.date);
                if (existingDay) {
                    existingDay.commit += 1;
                } else {
                    existingMonthYear.days.push({ date: commit.date, commit: 1 });
                }
            } else {
                dateArray.push({
                    year: commit.year,
                    month: commit.month,
                    name: getMonthName(commit.month),
                    days: [{ date: commit.date, commit: 1 }]
                });
            }
        });

        return dateArray;
    }


    // Generate Commit components for each month
    const generateMonthComponents = () => {
        const monthlyCommitData = generateMonthlyCommitData();
        console.log(monthlyCommitData);
        return monthlyCommitData.map((monthData) => {
            return <Commit key={monthData.name} monthName={monthData.name} dayData={monthData.days} />
        });
    }

    // Function to get month name (e.g., "May")
    const getMonthName = (month) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" fontWeight="bold" mb={2}>
                Repo Activities
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                commitData.length === 0 ? (
                    <Typography variant="body1" align="center">
                        No commit data
                    </Typography>
                ) : (
                    <Box className="commit-list">
                        {generateMonthComponents()}
                    </Box>
                )
            )}
        </Box>
    );
}

export default CommitList;
