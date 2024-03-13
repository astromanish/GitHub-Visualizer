import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';


const MostProductiveTimeChart = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [Time, setTime] = useState({
        Daytime: [],
        Afternoon: [],
        Evening: [],
        Night: []
    });
    const [TimebgColor, setBg] = useState();
    const [highestContribution, setHighestContribution] = useState('');

    useEffect(() => {
        if (props.events.length > 0 && !loaded) {
            dispEvents(props.events);
            setLoaded(true);
        }
    }, [props, loaded]);

    const dispEvents = (events) => {
        var timeArray = new Array(24).fill(0);
        events.forEach(res => {
            var day = new Date(res.created_at);
            var hours = day.getHours();
            timeArray[hours]++;
        });
        var sum = timeArray.reduce((acc, curr) => acc + curr, 0);

        // Divide the day into four parts: Daytime, Afternoon, Evening, and Night
        var partsOfDay = {
            Daytime: timeArray.slice(7, 12).reduce((acc, curr) => acc + curr, 0),
            Afternoon: timeArray.slice(12, 18).reduce((acc, curr) => acc + curr, 0),
            Evening: timeArray.slice(18, 22).reduce((acc, curr) => acc + curr, 0),
            Night: timeArray.slice(0, 7).reduce((acc, curr) => acc + curr, 0) + timeArray.slice(22, 24).reduce((acc, curr) => acc + curr, 0)
        };

        // Calculate percentages for each part of the day
        var partPercentage = {};
        for (const [key, value] of Object.entries(partsOfDay)) {
            partPercentage[key] = ((value / sum) * 100).toFixed(2);
        }

        // Background color for each part of the day
        var bgArray = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'];

        // Determine the part of the day with the highest contribution percentage
        var highestContributionPercentage = 0;
        var highestContributionPart = '';
        for (const [key, value] of Object.entries(partPercentage)) {
            if (parseFloat(value) > highestContributionPercentage) {
                highestContributionPercentage = parseFloat(value);
                highestContributionPart = key;
            }
        }
        setHighestContribution(highestContributionPart);

        setTime(partPercentage);
        setBg(bgArray);
    };

    return (
        <div>
            <Typography variant="h6" align="center" gutterBottom>
                Most Productive Daytime: {highestContribution}
            </Typography>
            {loaded && <Bar data={{
                datasets: [{
                    label: "Contribution %",
                    data: [Time.Daytime, Time.Afternoon, Time.Evening, Time.Night],
                    backgroundColor: TimebgColor,
                }],
                labels: ["Daytime", "Afternoon", "Evening", "Night"],
            }} options={{
                animation: {
                    duration: 3000,
                    easing: 'easeInOutQuint',
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        categoryPercentage: 1,
                        barPercentage: 0.9,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        barPercentage: 0.9,
                        categoryPercentage: 1,
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }
                }
            }} />}
        </div>
    );
}

export default MostProductiveTimeChart;
