import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:9000";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ShareListTable = () => {
  const classes = useStyles();
  const [sharesList, setSharesList] = useState([]);
  //const [page, setPage] = useState(0);
  //const [totalDocs, setTotalDocs] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("sharesList", data => {
      console.log(data);
      setSharesList(data.docs);
    });
  }, []);

  return (
    <Paper>
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell align="left">Company Id</TableCell>
            <TableCell align="left">Share ID</TableCell>
            <TableCell align="left">Share Type</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sharesList.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">
                {row.companyName}
              </TableCell>
              <TableCell align="left">{row.companyId}</TableCell>
              <TableCell align="left">{row.shareId}</TableCell>
              <TableCell align="left">{row.shareType}</TableCell>
              <TableCell align="right">{row.shareValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  );
};

export default ShareListTable;