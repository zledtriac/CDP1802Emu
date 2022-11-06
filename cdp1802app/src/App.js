//import './App.css';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField"
import {useRef} from 'react';
import {useState} from 'react';
import RegisterGrid from './RegisterGrid';
import MemoryView from './MemoryView';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import TAG from "./MemoryView.js";
let delay = 0;

const mem = require("./MemoryView.js");
const cdp = require("./cdp/cdp1802.js");

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
        default: "#261C2C"
    },
    divider: "#B396B8"
}});

function App() {
    const inputFile = React.useRef(null);

    const [changer, setChanger] = React.useState(false);
    const [runState, setRunState] = React.useState(false);

    const registers = cdp.getRegisters();
    const memory = cdp.getMemory();

    React.useEffect(function() {
        let timer = null;
        
        if(runState) {
            timer = setTimeout(function() {
                cdp.nextCycle();
                setChanger(!changer);
            }, Delay);
        }
        
        return () => clearTimeout(timer);
    });

    function forceUpdate() {
        setChanger(!changer);
    }

    function onLoadButton() {
        inputFile.current.click();
    }

    function onResetButton() {
        setRunState(false);
        cdp.resetCpu();
        forceUpdate();
    }

    function onNextCycleButton() {
        cdp.nextCycle();
        forceUpdate();
    }

    function onStop() {
        setRunState(false);
    }

    function onRun() {
        setRunState(true);
    }
	
	function CDP180256() {
        //inputFile.current.click();
		cdp.registers.CDP = 1;
		//cdp.CDPSWITCH();
    }
    
    function onStep() {
        let cnt = 5;
        cdp.nextCycle();
        while(registers.S > 0 && cnt) {
            cdp.nextCycle();
            cnt--;
        }
        forceUpdate();
    }

  const [Delay, SetDelay] = useState('');

const handleChange = event => {
    SetDelay(event.target.value);

    console.log('value is:', event.target.value);
  };

const inputRef = useRef(null);

  function CDPclick() {
	  
	  cdp.regs.CDP = 1;
    console.log(inputRef.current.value);
	
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
                            <MemoryView mem={memory} pc={registers.R[registers.P]} dp={registers.R[registers.X]} upd={changer} />
                            <Stack direction="row" spacing={1} >
                                <Button variant="contained" color="error" onClick={onResetButton}>RESET</Button>
                                <Button variant="contained" color="success" onClick={onRun} disabled={runState} disabled={mem.isInError}>RUN</Button>
                                <Button variant="contained" color="success" onClick={onStop} disabled={!runState}>STOP</Button>
                                <Button variant="contained" color="success" onClick={onStep} disabled={runState}>STEP</Button>
                                <Button variant="contained" color="success" onClick={onNextCycleButton} disabled={runState}>NEXT CYCLE</Button>
                                <Button variant="contained" onClick={onLoadButton} disabled={runState}>OPEN FILE</Button>
								<Button variant="contained" color="success" onClick={CDPclick}>CDP1802/5/6</Button>
								<Button variant="contained" color="success" onClick={onStop} disabled={!runState}>INTERRUPT(WIP)</Button>
								<Button variant="contained" color="success" onClick={onStop} disabled={!runState}>DMA IN(WIP)</Button>
								<Button variant="contained" color="success" onClick={onStop} disabled={!runState}>DMA OUT(WIP)</Button>
								<TextField id="delay" label="Delay in ms" variant="filled" value={Delay} onChange={handleChange} />
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