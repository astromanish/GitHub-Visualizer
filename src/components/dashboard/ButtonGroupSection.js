import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Badge } from '@mui/material';

import Activities from './Activities'
import Followers from './Followers'
import Following from './Following'
import Repositories from './Repositories'

function ButtonGroupSection({ events, profile, stats }) {

  const [activeTab, setActiveTab] = useState('activity');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'activity':
        return <Activities events={events} />;
      case 'followers':
        return <Followers userName={profile.login} stats={stats}/>;
      case 'following':
        return <Following userName={profile.login} stats={stats}/>;
      case 'repositories':
        return <Repositories userName={profile.login} stats={stats}/>;
      default:
        return <Activities events={events} />;
    }
  };

  return (
    <>
        <Box className="a-stats" paddingTop={4} height="100%">
          <Box mb={2} display="flex" flexDirection="column" alignItems="center"> 
            <ButtonGroup variant="contained" aria-label="outlined #424242 button group" m={4}>
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
          {getTabContent()}
        </Box>
    </>
  );
}

export default ButtonGroupSection;
