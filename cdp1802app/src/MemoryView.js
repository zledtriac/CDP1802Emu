
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#48374B",
    color: theme.palette.common.white,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "monospace"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontFamily: "monospace"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#503D54",
  '&:nth-of-type(odd)': {
    backgroundColor: "#5B4660",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function MemoryView(props) {
    let hex_columns = [];
    let rows = [];
    
    for(let i = 0; i<16; i++) {
        hex_columns.push(<StyledTableCell align="center" key={`headNum${i}`} >{i.toString(16).toUpperCase()}</StyledTableCell>);
    }
    
    for(let y = 0; y < 16; y++) {
        let line = [];
        let end_string = "";
        
        for(let x = 0; x < 16; x++) {
            const new_sx = {};
            
            let real_address = (y * 16) + x;
            
            if(real_address === props.pc) {
                new_sx["backgroundColor"] = "#009900";
                new_sx["color"] = "#fff";
            }
            
            line.push(<StyledTableCell sx={new_sx} align="center" key={`row${y}c${x}`} >{props.mem[real_address].toString(16).toUpperCase().padStart(2, "0")}</StyledTableCell>);
            
            if(props.mem[real_address] > 31 && props.mem[real_address] < 127) {
                end_string += String.fromCharCode(props.mem[real_address]);
            }
            else {
                end_string += ".";
            }
        }
        
        rows.push(
            <StyledTableRow key={`rownum${y}`} >
                <StyledTableCell key={`rowaddr${y}`} >{`0x${(y * 16).toString(16).toUpperCase().padStart(2, "0")}:`}</StyledTableCell>
                {line}
                <StyledTableCell key={`rowstr${y}`} >{end_string}</StyledTableCell>
            </StyledTableRow>
        );
    }
    
    return (
        <Box>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 200 }} size="small" >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Address</StyledTableCell>
                        {hex_columns}
                        <StyledTableCell>String</StyledTableCell>
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