import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { StarBorderOutlined, VisibilityOutlined } from '@mui/icons-material';

export default function Overview({ repoData }) {
  const { name, created_at, topics, forks_count, watchers, fork } = repoData;

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="50%" /* Adjusted width */
        boxShadow={3}
        p={2}
        borderRadius={8}
        m={2} /* Margin applied to all directions */
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {name}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={2}>
          Created at {new Date(created_at).toLocaleDateString()}
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" mb={2}>
          {topics.map((topic, index) => (
            <Chip key={index} label={topic} variant="outlined" color="primary" mr={1} mb={1} />
          ))}
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} width="100%">
          <Box display="flex" alignItems="center" justifyContent="flex-end" width="50%" mr={2}>
            <IconButton disabled={!fork} aria-label="forks">
              <StarBorderOutlined fontSize="large" />
            </IconButton>
            <Typography variant="body1" ml={1}>
              {forks_count}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-start" width="50%">
            <IconButton aria-label="watchers">
              <VisibilityOutlined fontSize="large" />
            </IconButton>
            <Typography variant="body1" ml={1}>
              {watchers}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
