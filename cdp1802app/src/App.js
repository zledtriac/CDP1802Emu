//import './App.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

import RegisterGrid from './RegisterGrid';
import MemoryView from './MemoryView';

const cdp = require("./cdp/cdp1802");

function App() {
  return (
    <div className="App">
        <CssBaseline />
        <Box>
            <Grid container columns={4} spacing={1} >
                <Grid item xs={1} >
                    <RegisterGrid regs={cdp.getRegisters()} />
                </Grid>
                <Grid item xs={3} >
                    <MemoryView mem={cdp.getMemory()} />
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}

export default App;
