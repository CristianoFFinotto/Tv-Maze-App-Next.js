import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../components/Header';
import MyAppBar from '../components/MyAppBar';

type Rows = {
  id: string;
  showName: string;
  users: number;
}[];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'showName', headerName: 'Show name', width: 130, sortable: true },
  { field: 'users', headerName: 'Users', width: 130, sortable: true },
];

const TopShow = () => {
  const watchingList = useSelector((state: RootState) => state.currentWatching.value);
  const [rows, setRows] = useState<Rows>([]);

  /* 
    log watchingList => {
      key as uid user: show name,
      ...N
    }
  */

  useEffect(() => {
    if (watchingList) {
      let showQtaUsers: any = {};
      let tempRows: Rows = [];

      /* 
        log Object.values(watchingList) => [
          show name
        ]      
      */
      Object.values(watchingList).forEach(
        (show: any) =>
          (showQtaUsers[show.id] = {
            users: (showQtaUsers[show.id]?.users || 0) + 1,
            showName: show.nameShow,
          }),
      );

      /* 
        log showQtaUsers => {
          key as show name: number of user current watching,
          ...N
        }
      
      */

      for (const key in showQtaUsers) {
        tempRows.push({
          id: key,
          showName: showQtaUsers[key].showName,
          users: showQtaUsers[key].users,
        });
      }

      setRows(tempRows);
    }
  }, [watchingList]);

  return (
    <>
      <Header title={'Tv Maze App - Top Show'} description={'Tv Maze App - Top Show'} />
      <MyAppBar />
      <Grid
        container
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100vh'}
      >
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <Paper sx={{ height: 400, width: '100%' }} elevation={5}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TopShow;
