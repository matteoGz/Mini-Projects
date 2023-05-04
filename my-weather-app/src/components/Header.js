import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import HomeIcon from '@mui/icons-material/Home';

const pages = [
  {title:'Weather', link:'/weather'},
  {title:'Temperatures', link:'/temperatures'},
  {title:'Locations', link:'/locations'}
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  return (
    <AppBar position="static" sx={{ borderRadius: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NightsStayIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Weather App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.link} style={{ color:"inherit", textDecoration: 'none' }}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <NightsStayIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Weather App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.title} to={page.link} style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', borderRadius: 10 }}
                  >
                    {page.title}
                  </Button>
              </Link>
            ))}
          </Box>
          <Box>
            <Link to='/' style={{ color:'inherit' }}>
              <HomeIcon/>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
