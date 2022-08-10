//import './App.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import RegisterGrid from './RegisterGrid';
import MemoryView from './MemoryView';

const cdp = require("./cdp/cdp1802");

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
        default: "#261C2C"
    },
    divider: "#B396B8"
  },
});

function App() {
  const inputFile = React.useRef(null);
  const [changer, setChanger] = React.useState(false);
  
  const registers = cdp.getRegisters();
  const memory = cdp.getMemory();
  
  function forceUpdate() {
    setChanger(!changer);
  }
  
  function onLoadButton() {
    inputFile.current.click();
  }
  
  function onResetButton() {
    cdp.resetCpu();
    forceUpdate();
  }
  
  function onNextCycleButton() {
    cdp.nextCycle();
    forceUpdate();
  }
  
  function onChange(e) {
    let freader = new FileReader();
    freader.onloadend = function(data) {
        let content = data.target.result;
        cdp.loadMemory(new Uint8Array(content, 0, content.length > 256 ? 256 : content.length));
        forceUpdate();
    };
    freader.readAsArrayBuffer(e.target.files[0]);    
  }
  
  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ padding: "10px" }} >
            <Grid container columns={4} spacing={1} >
                <Grid item xs={1} >
                    <RegisterGrid regs={registers} upd={changer} />
                </Grid>
                <Grid item xs={3} >
                    <Stack spacing={1} >
                        <MemoryView mem={memory} pc={registers.R[registers.P]} upd={changer} />
                        <Stack direction="row" spacing={1} >
                            <Button variant="contained" color="error" onClick={onResetButton} >RESET</Button>
                            <Button variant="contained" color="success" onClick={onNextCycleButton} >NEXT CYCLE</Button>
                            <Button variant="contained" onClick={onLoadButton} >OPEN FILE</Button>
                            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onChange} />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
        </ThemeProvider>
    </div>
  );
}



export default App;
