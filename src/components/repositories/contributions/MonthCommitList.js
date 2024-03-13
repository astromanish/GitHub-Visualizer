import React from 'react';
import { Grid } from '@mui/material';
import MonthCommit from './MonthCommit'; // Assuming the MonthCommit component is imported from another file

const MonthCommitList = ({ monthlyCommitData }) => {
    // Function to calculate the maximum days in a month
    const getMaxDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    // Function to generate MonthCommit components for each month
    const generateMonthComponents = () => {
        return monthlyCommitData.map((monthData) => {
            const maxDays = getMaxDaysInMonth(monthData.year, monthData.month);
            return (
                <Grid key={`${monthData.year}-${monthData.month}`} item xs={12} lg={4}>
                    <MonthCommit
                        year={monthData.year}
                        monthName={monthData.name}
                        dayData={monthData.days}
                        maxDays={maxDays}
                    />
                </Grid>
            );
        });
    };

    return (
        <Grid container spacing={2}>
            {generateMonthComponents()}
        </Grid>
    );
}

export default MonthCommitList;
