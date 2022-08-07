import './App.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import RegisterGrid from './RegisterGrid';
import MemoryView from './MemoryView';

let ram_array = Array(16).fill(0);

function App() {
  return (
    <div className="App">
        <Box>
            <Grid container columns={3} spacing={1} >
                <Grid item xs={1} >
                    <RegisterGrid ram_array={ram_array} />
                </Grid>
                <Grid item xs={2} >
                    <MemoryView />
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}

export default App;
