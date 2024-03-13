import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';


const WeekdayChart = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [Days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [highestContributionDay, setHighestContributionDay] = useState('');

    useEffect(() => {
        if (props.events.length > 0 && !loaded) {
            dispEvents(props.events);
            setLoaded(true);
        }
    }, [props, loaded]);

    const dispEvents = (events) => {
        var daysArray = [0, 0, 0, 0, 0, 0, 0];
        events.forEach(res => {
            var day = new Date(res.created_at);
            var dayIndex = day.getDay();
            daysArray[dayIndex]++;
        });
        var sum = daysArray.reduce((acc, curr) => acc + curr, 0);
        var dayPercentage = daysArray.map(day => ((day / sum) * 100).toFixed(2));

        // Determine the day with the highest contribution percentage
        var highestContributionPercentage = 0;
        var highestContributionIndex = 0;
        for (let i = 0; i < dayPercentage.length; i++) {
            if (parseFloat(dayPercentage[i]) > highestContributionPercentage) {
                highestContributionPercentage = parseFloat(dayPercentage[i]);
                highestContributionIndex = i;
            }
        }
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        setHighestContributionDay(daysOfWeek[highestContributionIndex]);

        setDays(dayPercentage);
    };

    return (
        <div>
            <Typography variant="h6" align="center" gutterBottom>
                Most Productive Day: {highestContributionDay}
            </Typography>
            {loaded && <Bar data={{
                datasets: [{
                    label: "Contribution %",
                    data: Days,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 1, 64, 0.5)'
                    ]
                }],
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            }} options={{
                animation: {
                    duration: 3000,
                    easing: 'easeInOutQuint',
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: true
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: false
                    }
                }
            }} />}
        </div>
    );
}

export default WeekdayChart;
