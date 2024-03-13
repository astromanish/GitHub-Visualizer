import React from 'react';
import { Box, Typography } from '@mui/material';

const MonthCommit = ({ year, monthName, dayData, maxDays }) => {
    // Function to generate boxes for each day of the month
    const renderBoxes = () => {
        const boxes = [];
        for (let i = 1; i <= maxDays; i++) {
            const day = dayData.find(day => day.date === i);
            const commitCount = day ? day.commit : 0;
            const backgroundColor = commitCount === 0 ? '#FFFFFF' : `rgba(0, 255, 0, ${commitCount / 20})`; // Green color with intensity based on commit count
            boxes.push(
                <Box
                    key={i}
                    sx={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: backgroundColor,
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        color: commitCount === 0 ? 'black' : 'white', // White text if commit exists, black otherwise
                    }}
                >
                    {i}
                </Box>
            );
        }
        return boxes;
    };

    return (
        <Box sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            marginBottom: '20px',
        }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                {year} {monthName}
            </Typography>
            <Box sx={{
                display: 'flex', // Change display to flex to allow boxes to grow
                flexDirection: 'row', // Ensure boxes are arranged in a row
                flexWrap: 'wrap', // Allow boxes to wrap to the next line if needed
                gap: '4px'
            }}>
                {renderBoxes()}
            </Box>
        </Box>
    );
}

export default MonthCommit;
