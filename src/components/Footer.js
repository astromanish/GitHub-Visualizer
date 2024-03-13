import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" bgcolor="#303030" py={4} px={2}>
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          Like it? Give a star on <Link href="https://github.com/astromanish/git-stats" color="primary">GitHub</Link>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box mr={2}>
          <Typography variant="body2" color="textSecondary">
            <Link href="https://github.com/astromanish" color="primary">Manish Singh</Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">
            <Link href="https://github.com/rush-tea" color="primary">Adarsh Tripathi</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
