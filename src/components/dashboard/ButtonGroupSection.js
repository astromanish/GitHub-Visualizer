import React from 'react';
import { Box, Button, ButtonGroup, Badge, Grid } from '@mui/material';

const ButtonGroupSection = ({ activeTab, handleTabChange, stats }) => (
  <Grid item xs={12} md={6}>
    <Box className="a-stats" paddingTop={4}>
      <Box mb={2} display="flex" flexDirection="column" alignItems="center">
        <ButtonGroup variant="contained" aria-label="outlined #424242 button group">
          <Button onClick={() => handleTabChange('activity')} variant={activeTab === 'activity' ? 'contained' : 'outlined'}>Activity</Button>
          <Badge badgeContent={stats.followers} color="primary">
            <Button onClick={() => handleTabChange('followers')} variant={activeTab === 'followers' ? 'contained' : 'outlined'}>Followers</Button>
          </Badge>
          <Badge badgeContent={stats.following} color="primary">
            <Button onClick={() => handleTabChange('following')} variant={activeTab === 'following' ? 'contained' : 'outlined'}>Following</Button>
          </Badge>
          <Badge badgeContent={stats.repos} color="primary">
            <Button onClick={() => handleTabChange('repositories')} variant={activeTab === 'repositories' ? 'contained' : 'outlined'}>Repositories</Button>
          </Badge>
        </ButtonGroup>
      </Box>
    </Box>
  </Grid>
);

export default ButtonGroupSection;
