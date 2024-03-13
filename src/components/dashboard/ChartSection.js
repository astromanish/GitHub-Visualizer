import React, { useState, useEffect } from 'react';
import MostProductiveTimeChart from './MostProductiveTimeChart';
import WeekdayChart from './WeekdayChart';
import { Chart, registerables } from 'chart.js';
import { Grid, Box } from '@mui/material';

Chart.register(...registerables);

const DayStats = (props) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        var ev = [];
        if (props.events.length > 0) {
            props.events.forEach(res => {
                ev.push(res);
            });
        }
        setEvents(ev);
    }, [props]);

    return (
        <Box boxShadow={3} p={2} borderRadius={4} m={2}>
            <Grid item xs={12}>
                <MostProductiveTimeChart events={events} />
            </Grid>
            <Grid item xs={12}>
                <WeekdayChart events={events} />
            </Grid>
        </Box>
    );
}

export default DayStats;
