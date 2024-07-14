import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';
import React from 'react';

export const Rightbar = () => {
  return (
    <Box padding={2} flex={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position='fixed' width={300}>
        <Typography variant='h6' fontWeight={100}>
          Online Friends
        </Typography>
        <AvatarGroup max={7}>
          <Avatar alt='Remy Sharp' src='https://material-ui.com/static/images/avatar/1.jpg' />
          <Avatar alt='Travis Howard' src='https://material-ui.com/static/images/avatar/2.jpg' />
          <Avatar alt='Cindy Baker' src='https://material-ui.com/static/images/avatar/3.jpg' />
          <Avatar alt='Agnes Walker' src='https://material-ui.com/static/images/avatar/4.jpg' />
          <Avatar alt='Trevor Henderson' src='https://material-ui.com/static/images/avatar/5.jpg' />
          <Avatar alt='Trevor Henderson' src='https://material-ui.com/static/images/avatar/7.jpg' />
          <Avatar alt='Trevor Henderson' src='https://material-ui.com/static/images/avatar/8.jpg' />
          <Avatar alt='Trevor Henderson' src='https://material-ui.com/static/images/avatar/7.jpg' />
          <Avatar alt='Trevor Henderson' src='https://material-ui.com/static/images/avatar/8.jpg' />
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default Rightbar;
