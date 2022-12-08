import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const TopShow = () => {
  const watchingList = useSelector((state: RootState) => state.currentWatching.value);
  const [usersCount, setUsersCount] = useState<any>({});

  useEffect(() => {
    if (watchingList) {
      let temp: any = {};
      Object.values(watchingList).forEach((show) => {
        temp[show] = (temp[show] || 0) + 1;
      });
      setUsersCount(temp);
    }
  }, [watchingList]);

  return (
    <Grid container display={'flex'} justifyContent={'center'} marginTop={'2vh'}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <TableContainer component={Paper}>
          <Table aria-label='table'>
            <TableHead>
              <TableRow>
                <TableCell>Show Name</TableCell>
                <TableCell align='right'>Users Watching</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(usersCount).length > 0
                ? Object.keys(usersCount).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row}
                      </TableCell>
                      <TableCell align='right'>{usersCount[row]}</TableCell>
                    </TableRow>
                  ))
                : undefined}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default TopShow;
