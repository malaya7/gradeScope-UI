import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Popover from './Popover';
import GraphPopover from './GraphPopover'
import Download from "./downloadCSV";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  // console.log(props)
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell>Title</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Action</TableCell>
           {/*  <TableCell>Avg Score</TableCell> */}
            <TableCell>Download</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {props.item.Assignments.map((row) => (
            <TableRow key={row.Name}>
              <TableCell>{row.Name}</TableCell>
              <TableCell><GraphPopover courseInfo={row} /></TableCell>
              <TableCell><Popover courseInfo={row} /></TableCell>
              {/* <TableCell>{row.AvgScore || 53}</TableCell> */}
              {/* <TableCell>{config.idFromLink(row.Link)}</TableCell> */}
              <TableCell><Download  cname={props.cname} courseInfo={row} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}