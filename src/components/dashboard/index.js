import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import TopSection from './TopSection';
import ChartSection from './ChartSection';
import ButtonGroupSection from './ButtonGroupSection';
import Footer from '../Footer';
import {fetchUserProfile,fetchUserEvents} from './../utils/githubApiUtils'; 


function Dashboard() {
  const { user_id } = useParams();

  const [loaded, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [profile, setProfile] = useState({});

  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    repos: 0
  });

  const getStats = async (userId, loaded) => {
    if (loaded) {
      setLoading(true);
      const { profile, error: profileError } = await fetchUserProfile(userId);
      if (!profileError && profile) {
        setProfile(profile);
        setStats({
          followers: profile.followers,
          following: profile.following,
          repos: profile.public_repos,
        });
      } else {
        // Handle the error appropriately
      }
  
      const { events, error: eventsError } = await fetchUserEvents(userId);
      if (!eventsError) {
        setEvents(events);
      } else {
        // Handle the error appropriately
      }
  
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, [loaded, user_id]);

  return (
    <>
        <TopSection profile={profile} />
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item lg={7}>
                    <ChartSection loaded={loaded} events={events} />
                </Grid>
                <Grid item lg={5}>
                    <ButtonGroupSection stats={stats} events={events} profile={profile} />
                </Grid>
            </Grid>
        </Container>
        <Footer />
    </>
  );
}

export default Dashboard;
