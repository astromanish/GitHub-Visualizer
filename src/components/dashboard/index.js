import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Badge from '@mui/material/Badge';
import { Box, Container, Grid } from '@mui/material';

import Profile from './Profile';
import Charts from './charts';
import Activities from './Activities';
import Followers from './Followers';
import Following from './Following';
import Repositories from './Repositories';
import Footer from '../Footer';

function Dashboard() {
  const { user_id } = useParams();

  const [loaded, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [profile, setProfile] = useState({
    avatar_url: '',
    bio: '',
    company: '',
    joinedOn: '',
    name: '',
    login: ''
  });

  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    repos: 0
  });

  const [activeTab, setActiveTab] = useState('activity');

  const githubToken = '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';

  const getStats = async () => {
    if (loaded) {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      try {
        const res = await axios.get(`https://api.github.com/users/${user_id}`, {
          headers: {
            authorization: `Bearer ${githubToken}`
          }
        });
        const date = new Date(res.data.created_at);
        setProfile({
          avatar_url: res.data.avatar_url,
          bio: res.data.bio,
          company: res.data.company,
          joinedOn: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
          name: res.data.name,
          login: res.data.login
        });
        setStats({
          followers: res.data.followers,
          following: res.data.following,
          repos: res.data.public_repos
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }

      try {
        const res = await axios.get(`https://api.github.com/users/${user_id}/events?page=1&per_page=45`, {
          headers: {
            authorization: `Bearer ${githubToken}`
          }
        });
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getStats();
  }, [loaded, user_id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'activity':
        return <Activities events={events} />;
      case 'followers':
        return <Followers userName={profile.login} />;
      case 'following':
        return <Following userName={profile.login} />;
      case 'repositories':
        return <Repositories userName={profile.login} />;
      default:
        return <Activities events={events} />;
    }
  };

  return (

    <>
    <Container maxWidth="xl">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          {loaded ? (
            <PuffLoader color="#4A90E2" loading={loaded} />
          ) : (
            <Profile profile={profile} />
          )}
        </Grid>
      </Grid>
    </Container>
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box className="day-stats" style={{ minHeight: '400px' }}>
            {loaded ? null : events.length > 0 && <Charts events={events} />}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="a-stats" paddingTop={4}>
            <Box mb={2} display="flex" flexDirection="column" alignItems="center">
              <ButtonGroup variant="contained" aria-label="outlined #424242 button group">
                <Button
                  onClick={() => handleTabChange('activity')}
                  variant={activeTab === 'activity' ? 'contained' : 'outlined'}
                >
                  Activity
                </Button>
                <Badge badgeContent={stats.following} color="primary">
                  <Button
                    onClick={() => handleTabChange('followers')}
                    variant={activeTab === 'followers' ? 'contained' : 'outlined'}
                  >
                    Followers
                  </Button>
                </Badge>
                <Badge badgeContent={stats.repos} color="primary">
                  <Button
                    onClick={() => handleTabChange('following')}
                    variant={activeTab === 'following' ? 'contained' : 'outlined'}
                  >
                    Following
                  </Button>
                </Badge>
                <Badge badgeContent={stats.repos} color="primary">
                  <Button
                    onClick={() => handleTabChange('repositories')}
                    variant={activeTab === 'repositories' ? 'contained' : 'outlined'}
                  >
                    Repositories
                  </Button>
                </Badge>
              </ButtonGroup>
            </Box>
            {getTabContent()}
          </Box>
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>
    

  );
}

export default Dashboard;
