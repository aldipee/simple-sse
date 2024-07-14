import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Rightbar } from '../components/Rightbar';
import { Feed } from '../components/Feed';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import Add from '../components/Add';

export function HomePage() {
  const [mode, setMode] = useState('light');

  return (
    <Box bgcolor={'background.default'} color={'text.primary'}>
      <Navbar />
      <Stack direction='row' justifyContent='space-between' spacing={2}>
        <Sidebar setMode={setMode} mode={mode} />
        <Feed />
        <Rightbar />
      </Stack>
      <Add />
    </Box>
  );
}
