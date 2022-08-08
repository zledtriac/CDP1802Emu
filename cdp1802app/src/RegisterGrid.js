
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function RegisterGrid(props) {
    
    let blocks = [];
    
    for(let i = 0; i < props.regs.R.length; i++) {
        blocks.push(<RegisterBlock key={`reg${i}`} index={i} value={props.regs.R[i]} />)
    }
    
    return (
        <Grid container spacing={1} columns={2} >
            {blocks}
        </Grid>
    );
}

function RegisterBlock(props) {
    return (
        <Grid item xs={1}>
            <Item>
                <div>{`R${props.index}`}</div>
                <div>{props.value.toString(2).padStart(16, "0")}</div>
            </Item>
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