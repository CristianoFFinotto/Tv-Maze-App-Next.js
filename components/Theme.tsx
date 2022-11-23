import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme, { ThemeOptions } from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const light: ThemeOptions = {
  palette: {
    mode: 'light',
  },
};

const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
};

const Theme = ({ children }: any) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <ThemeProvider theme={theme === 'light' ? createTheme(light) : createTheme(dark)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
