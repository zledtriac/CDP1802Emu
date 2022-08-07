
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function MemoryView() {
    
    let hex_columns = [];
    
    for(let i = 0; i<16; i++) {
        hex_columns.push(<TableCell>{i.toString(16).toUpperCase().padStart(2, "0")}</TableCell>);
    }
    
    return (
        <Box>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        {hex_columns}
                        <TableCell>String</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
        </Box>
    );
}