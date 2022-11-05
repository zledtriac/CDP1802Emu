
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {useState} from 'react';
export default function RegisterGrid(props) {
    
    let blocks = [];
    let state_strings = [
        "FETCH",
        "EXECUTE",
        "DMA",
        "INTERRUPT"
    ];
	
	
	const [IN1, setIN1] = useState('');

  const IN1Handler = event => {
  setIN1(event.target.value);};
	
	const [IN2, setIN2] = useState('');

  const IN3Handler = event => {
  setIN2(event.target.value);};
  
  const [IN3, setIN3] = useState('');

  const IN2Handler = event => {
  setIN3(event.target.value);};
  
  const [IN4, setIN4] = useState('');

  const IN4Handler = event => {
  setIN4(event.target.value);};
    
    for(let i = 0; i < props.regs.R.length; i++) {
        let new_sx = {};
        
        if(props.regs.X === i) new_sx["backgroundColor"] = "#777700";
        if(props.regs.P === i) new_sx["backgroundColor"] = "#007700";
        
        blocks.push(<RegisterBlock sx={new_sx} key={`reg${i}`} name={`R${i}`} value={props.regs.R[i]} bits={16} size={4} />)
    }
    
    return (
        <Grid container spacing={1} columns={8} >
            {blocks}
            <RegisterBlock key="regB" name="B" value={props.regs.B} bits={8} size={4} />
            <RegisterBlock key="regD" name="D" value={props.regs.D} bits={8} size={4} />
            <RegisterBlock key="regI" name="I" value={props.regs.I} bits={4} size={2} />
            <RegisterBlock key="regN" name="N" value={props.regs.N} bits={4} size={2} />
            <RegisterBlock key="regT" name="T" value={props.regs.T} bits={8} size={4} />
            <RegisterBlock key="regP" name="P" sx={{ backgroundColor: "#007700" }} value={props.regs.P} bits={4} size={2} />
            <RegisterBlock key="regX" name="X" sx={{ backgroundColor: "#777700" }} value={props.regs.X} bits={4} size={2} />
            <RegisterBlock key="regS" name="S" value={props.regs.S} bits={2} size={1} />
            <RegisterBlock key="regDF" name="DF" value={props.regs.DF} bits={1} size={1} />
            <RegisterBlock key="regIE" name="IE" value={props.regs.IE} bits={1} size={1} />
            <RegisterBlock key="regQ" name="Q" value={props.regs.Q} bits={1} size={1} />
            <TextField id="IN" label="IN 1(HEX)" variant="filled" value={IN1} onChange={IN1Handler} />
            <RegisterBlock key="OUT" name="OUT 1" value={props.regs.OUT[1]} bits={8} size={4} />
			<TextField id="IN2" label="IN 2(HEX)" variant="filled" value={IN2} onChange={IN2Handler} />
            <RegisterBlock key="OUT2" name="OUT 2" value={props.regs.OUT[2]} bits={8} size={4} />
			<TextField id="IN3" label="IN 3(HEX)" variant="filled" value={IN3} onChange={IN3Handler} />
            <RegisterBlock key="OUT3" name="OUT 3" value={props.regs.OUT[3]} bits={8} size={4} />
			<TextField id="IN4" label="IN 4(HEX)" variant="filled" value={IN4} onChange={IN4Handler} />
            <RegisterBlock key="OUT4" name="OUT 4" value={props.regs.OUT[4]} bits={8} size={4} />

			<RegisterBlock key="CDP" name="CDP1802/5/6" value={props.regs.CDP} bits={1} size={2} />
            <TextBlock key="StateText" text={state_strings[props.regs.S]} size={8} />
        </Grid>
    );
}

function RegisterBlock(props) {
    return (
        <Grid item xs={props.size}>
            <Item sx={props.sx}>
                <div>{props.name}</div>
                <div>{props.value.toString(2).padStart(props.bits, "0")}</div>
            </Item>
        </Grid>
    );
}





function TextBlock(props) {
    return (
        <Grid item xs={props.size}>
            <Item sx={{ fontSize: 24 }}>
                <div>{props.text}</div>
            </Item>
        </Grid>
    );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#3E2C41' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: 12,
  fontWeight: "bold",
  fontFamily: "monospace"
}));