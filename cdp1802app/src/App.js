import './App.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div className="App">
        <Box>
        <RegisterGrid />
        </Box>
    </div>
  );
}

function RegisterGrid() {
    return (
        <Grid container spacing={1} columns={2} sx={{ padding: "10px", width: "30%"}}>
            <Grid item xs={1}>
                <Item>asdasg</Item>
            </Grid>
            <Grid item xs={1}>
                <Item>xs=4</Item>
            </Grid>
            <Grid item xs={1}>
                <Item>xs=4</Item>
            </Grid>
            <Grid item xs={1}>
                <Item>xs=8</Item>
            </Grid>
        </Grid>
    );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default App;
