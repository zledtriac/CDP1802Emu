import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import {useRef} from 'react';
import {useState} from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RAM from "./cdp/cdp1802.js";

import App from "./App.js";
const cdp = require("./cdp/cdp1802.js")



export default function RAMview() {
	
	const columns = [
        { field: 'id', headerName: 'adress', width: 70 },
        { field: 'firstname', headerName: '0', width: 130 },
        { field: 'lastName', headerName: '1', width: 130 },
        { field: 'userName', headerName: '2', width: 130},
        { field: 'userEmail', headerName: '3', width: 180 },
        { field: 'userRole', headerName: '4', width: 80}
    ];
	
	const rows =RAM.map(RAM);
	


	
	return (
	
	  <p aaa />
	
	);
	
}