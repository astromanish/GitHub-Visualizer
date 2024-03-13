import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';
import { Container, Grid } from '@mui/material';
import TopSection from './TopSection';
import ChartSection from './ChartSection';
import ButtonGroupSection from './ButtonGroupSection';
import Footer from '../Footer';

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


  const githubBearer = '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';

  const getStats = async () => {
    if (loaded) {
      try {
        const res = await axios.get(`https://api.github.com/users/${user_id}`, {
          headers: {
            authorization: `Bearer ${githubBearer}`
          }
        });
        const date = new Date(res.data.created_at);
        setProfile(res.data);
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
            authorization: `Bearer ${githubBearer}`
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

  return (
    <>
      <TopSection profile={profile} />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <ChartSection loaded={loaded} events={events} />
          <ButtonGroupSection stats={stats} events={events} profile={profile} />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
