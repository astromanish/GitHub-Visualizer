import React from 'react';
import { Box, Grid } from '@mui/material';
import Charts from './charts';

const ChartSection = ({ loaded, events }) => (
  <Grid item xs={12} md={6}>
    <Box className="day-stats" style={{ minHeight: '400px' }}>
      {loaded ? null : events.length > 0 && <Charts events={events} />}
    </Box>
  </Grid>
);

export default ChartSection;
