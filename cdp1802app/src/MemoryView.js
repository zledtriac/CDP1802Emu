
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default function MemoryView(props) {
    
    let hex_columns = [];
    let rows = [];
    
    for(let i = 0; i<16; i++) {
        hex_columns.push(<TableCell align="center" >{i.toString(16).toUpperCase().padStart(2, "0")}</TableCell>);
    }
    
    for(let y = 0; y < 16; y++) {
        let line = [];
        for(let x = 0; x < 16; x++) {
            line.push(<TableCell align="center" key={`row${y}c${x}`} >{props.mem[(y * 16) + x].toString(16).toUpperCase().padStart(2, "0")}</TableCell>);
        }
        rows.push(
            <TableRow>
                <TableCell key={`rown${y}`}>{`0x${(y * 16).toString(16).toUpperCase().padStart(2, "0")}`}</TableCell>
                {line}
                <TableCell>{"................"}</TableCell>
            </TableRow>
        );
    }
    
    return (
        <Box>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 300, fontSize: 12 }} size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        {hex_columns}
                        <TableCell>String</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}