import Header from "../components/Header";
import AdditionalInfo from "../components/AdditionalInfo";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SearchIcon } from "@primer/octicons-react";
import axios from "axios";

export default function AdditionalInfoPage() {
    
  const location = useLocation();
  console.log("uLocation: ", location);
  const [coordinates, setCoordinates] = useState('');

  useEffect(() => {
    if(location.state.coordinates === null || location.state.coordinates === undefined){
      setCoordinates(null);    
    }else{
      setCoordinates(location.state.coordinates);
    }
  }, [location.state.coordinates])
  console.log("coord passed? : ", coordinates)

  const [isFromRoute, setIsFromRoute] = useState(false)
  
  useEffect(() => {
    (coordinates === null || coordinates === undefined) ?
      setIsFromRoute(false)
    : setIsFromRoute(true)
  }, [coordinates])
  console.log("from route path: ", isFromRoute)
    
  const [searchedCity, setSearchedCity] = useState();
  
  const handleChangeCity = (event) => {
    setSearchedCity(event.target.value)
  }

  function searchCity(){
    console.log("...searching city...", searchedCity)
    setIsFromRoute(!isFromRoute)
    axios.get('https://nominatim.openstreetmap.org/search?q='+searchedCity+'&format=json')
          .then((response) => {
            if(response.data.length > 0){
                setCoordinates(response.data[0]);
                localStorage.setItem('coordinates', JSON.stringify(response.data[0]));
            } else{
                console.warn("Insert a valid location")
            }
          })
          .catch(() => console.error("Failed to retrieve coordinates - REQ"))
  }
  
  console.log("_setted_ ", coordinates)

  return(
    <>
      <Header/>
      { isFromRoute ? 
          <AdditionalInfo coordinates={coordinates}/>
        :  <Dialog open={!isFromRoute}>
            <DialogTitle>I have to retrieve a city</DialogTitle>
            <DialogContent>
              <TextField
                variant="outlined"
                placeholder="Insert a city"
                onChange={handleChangeCity}
                />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => searchCity()}
                endIcon={<SearchIcon/>}
                sx={{ borderRadius: 10 }}
                >
                Search
              </Button>
            </DialogActions>
          </Dialog>
      }
      <Footer/>
    </>
  );
};