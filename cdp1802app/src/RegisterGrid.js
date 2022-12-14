
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function RegisterGrid(props) {
    
    let blocks = [];
    let state_strings = [
        "FETCH",
        "EXECUTE",
        "DMA",
        "INTERRUPT"
    ];
    
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