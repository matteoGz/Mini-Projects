import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, Chip, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { photoKey } from '../api/apiKey';

const pages = [
  {title:'Weather', link:'/weather'},
  {title:'Temperatures', link:'/temperatures'},
  {title:'Other info', link:'/additional_info'},
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const [coordinates, setCoordinates] = React.useState({});
  const [avatarPhoto, setAvatarPhoto] = React.useState({});

  React.useEffect(() => {
    let coordinatesFromLocalStorage = JSON.parse(localStorage.getItem('coordinates'));
    console.log("coordinates from localStorage ", coordinatesFromLocalStorage)
    if(coordinatesFromLocalStorage !== null){
      let cityByCoordinates = coordinatesFromLocalStorage.display_name.split(",");
      setCoordinates(coordinatesFromLocalStorage);
      axios.get("https://pixabay.com/api/?key="+photoKey+"&q="+cityByCoordinates[0])
        .then((response)=> {
          if(response.data.hits.length > 0){
            setAvatarPhoto(response.data.hits[0]);
            console.log("photo info ", response.data.hits[0])   
          } 
        })
        .catch(() => console.error("Req city photo failed"))
    }    
  }, [localStorage.getItem('coordinates')])

  //json to set in localStorage:
  /*
  {"place_id":307634198,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"relation","osm_id":44875,"boundingbox":["44.3784709","44.5198419","8.6657444","9.0955805"],"lat":"44.40726","lon":"8.9338624","display_name":"Genova, Genoa, Liguria, Italia","class":"boundary","type":"administrative","importance":0.7921779665930816,"icon":"https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png"}
  */
 
  return (
    <AppBar position="static">
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
                  <Link key={page.title} to={page.link} state={{ coordinates: coordinates }} style={{ color:"inherit", textDecoration: 'none' }}>
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
              <Link key={page.title} to={page.link} state={{ coordinates: coordinates }} style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', borderRadius: 10 }}
                  >
                    {page.title}
                  </Button>
              </Link>
            ))}
          </Box>
          { Object.keys(coordinates).length !== 0 ?
              coordinates.display_name !== null || coordinates !== undefined ?  
                <Box>
                  <Chip
                    color='primary'
                    variant='outlined'
                    label={coordinates.display_name}
                    avatar={<Avatar alt={coordinates.display_name} src={avatarPhoto.previewURL} />}
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Box>
              : <></>
            : <></>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
