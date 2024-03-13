import React from 'react';
import { Box, Typography } from '@mui/material';

const Commit = ({ dayData, monthName, year}) => {
    const daysInMonth = 31; // Maximum days in a month

    // Function to calculate the intensity of green color based on the commit count
    const getGreenIntensity = (commitCount) => {
        // Scale the commit count to a value between 0 and 255
        const scaledValue = Math.min(Math.floor((commitCount / 20) * 255), 255);
        // Convert the scaled value to hexadecimal format
        const hexValue = scaledValue.toString(16).padStart(2, '0');
        // Return the CSS color string
        return `#00${hexValue}00`;
    };

    // Function to generate boxes for each day of the month
    const renderBoxes = () => {
        const boxes = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const commit = dayData.find(day => day.date === i);
            const commitCount = commit ? commit.commit : 0;
            const greenIntensity = getGreenIntensity(commitCount);
            boxes.push(
                <Box
                    key={i}
                    sx={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: greenIntensity,
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 4px rgba(255, 255, 255, 0.5)',
                        color: 'white'
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
            marginBottom: '20px'
        }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                {year} {monthName}
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '5px'
            }}>
                {renderBoxes()}
            </Box>
        </Box>
    );
}

export default Commit;
