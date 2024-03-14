import React from 'react';
import { Container, Grid } from '@mui/material';
import Profile from './Profile';

const TopSection = ({ profile }) => (
  <Container maxWidth="xl">
    <Grid container justifyContent="center">
      <Grid item xs={12}>
         <Profile profile={profile} />
      </Grid>
    </Grid>
  </Container>
);

export default TopSection;
