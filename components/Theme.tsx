import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme, { ThemeOptions } from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const light: ThemeOptions = createTheme({
  palette: {
    background: {
      default: '#DFE8CC',
      paper: '#FFEEAF',
    },
    text: {
      primary: '#000000de',
      secondary: '#0000008a',
      disabled: '#00000061',
    },
    primary: {
      main: '#3b3333',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#eb1164',
    },
    warning: {
      main: '#febc5f',
    },
    info: {
      main: '#a0782f',
    },
    success: {
      main: '#5a991e',
    },
  },
});

const dark: ThemeOptions = createTheme({
  palette: {
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#ffffffb3',
      disabled: '#ffffff80',
    },
    primary: {
      main: '#3b3333',
    },
    secondary: {
      main: '#9d7f7b',
    },
    error: {
      main: '#eb1164',
    },
    warning: {
      main: '#febc5f',
    },
    info: {
      main: '#a0782f',
    },
    success: {
      main: '#5a991e',
    },
  },
});

const Theme = ({ children }: any) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
