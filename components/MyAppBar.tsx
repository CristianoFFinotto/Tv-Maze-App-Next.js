import React from 'react';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Drawer,
  alpha,
  InputBase,
  styled,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { handleOnChangeTheme } from '../redux/themeSlice';
import { auth } from '../pages/_app';
import MyButton from './MyButton';
import Link from 'next/link';

const navItems = ['home', 'favorites'];
const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

type PropsType = {
  handleOnSearch?: (search: string) => void;
};

const MyAppBar = (props: PropsType) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const currentSearch = useSelector((state: RootState) => state.currentSearch.value);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Tv Maze App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link
                href={item === 'home' ? '/' : `/${item}`}
                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
              >
                <ListItemText primary={item} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            onClick={() => signOut(auth).catch((error: Error) => console.error(error.message))}
          >
            <ListItemText primary={'sign out'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={() => dispatch(handleOnChangeTheme())} color='inherit'>
              {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav'>
        <Toolbar
          sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'space-between', sm: 'unset' } }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Tv Maze App
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                <Link
                  href={item === 'home' ? '/' : `/${item}`}
                  style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                >
                  {item}
                </Link>
              </Button>
            ))}
            <MyButton
              style={{ color: '#fff' }}
              handleOnClick={() =>
                signOut(auth).catch((error: Error) => console.error(error.message))
              }
            >
              Sign out
            </MyButton>
            <IconButton onClick={() => dispatch(handleOnChangeTheme())} color='inherit'>
              {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          {props.handleOnSearch ? (
            <Search
              onChange={(e: any) => {
                props.handleOnSearch!(e.target.value);
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                value={currentSearch}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          ) : undefined}
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default MyAppBar;
