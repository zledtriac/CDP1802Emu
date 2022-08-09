
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function RegisterGrid(props) {
    
    let blocks = [];
    
    for(let i = 0; i < props.regs.R.length; i++) {
        blocks.push(<RegisterBlock key={`reg${i}`} name={`R${i}`} value={props.regs.R[i]} bits={16} size={4} />)
    }
    
    return (
        <Grid container spacing={1} columns={8} >
            {blocks}
            <RegisterBlock key="regB" name="B" value={props.regs.B} bits={8} size={4} />
            <RegisterBlock key="regD" name="D" value={props.regs.D} bits={8} size={4} />
            <RegisterBlock key="regI" name="I" value={props.regs.I} bits={4} size={2} />
            <RegisterBlock key="regN" name="N" value={props.regs.N} bits={4} size={2} />
            <RegisterBlock key="regP" name="P" value={props.regs.P} bits={4} size={2} />
            <RegisterBlock key="regX" name="X" value={props.regs.X} bits={4} size={2} />
            <RegisterBlock key="regDF" name="DF" value={props.regs.DF} bits={1} size={1} />
            <RegisterBlock key="regIE" name="IE" value={props.regs.IE} bits={1} size={1} />
            <RegisterBlock key="regQ" name="Q" value={props.regs.Q} bits={1} size={1} />
        </Grid>
    );
}

function RegisterBlock(props) {
    return (
        <Grid item xs={props.size}>
            <Item>
                <div>{props.name}</div>
                <div>{props.value.toString(2).padStart(props.bits, "0")}</div>
            </Item>
        </Grid>
    );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: 12,
  fontWeight: "bold",
  fontFamily: "monospace"
}));