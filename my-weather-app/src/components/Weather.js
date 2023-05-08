import React, { useState } from 'react'
import axios from 'axios'
import { Button, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { weatherByWmoCode } from '../models/weatherByWmoCode';

//api Key to retrieve photo of selected city
const photoKey = "36153502-ff5ba4e1922e4ae564dfa46bd";

export default function Weather(){
    const[selectedCity, setSelectedCity] = useState('')
    const[coordinates, setCoordinates] = useState({});
    const[cityPhoto, setCityPhoto] = useState({});
    const[currentInfo, setCurrentInfo] = useState({});

    const handleChangeCity= (event) => {
        setSelectedCity(event.target.value)
    }

    function searchCity() {
    //to get coordinates of input city
        axios.get('https://nominatim.openstreetmap.org/search?q='+selectedCity+'&format=json')
            .then((response) => {
                if(response.data.length > 0){
                    setCoordinates(response.data[0]);
                }
            //to get selected city's photo
                axios.get("https://pixabay.com/api/?key="+photoKey+"&q="+selectedCity)
                    .then((response)=> {
                        if(response.data.hits.length > 0){
                            setCityPhoto(response.data.hits[0]);   
                        } 
                    })
                    .catch(() => console.error("Req city photo failed"))
            //to get weather info
                axios.get("https://api.open-meteo.com/v1/forecast?latitude="+response.data[0].lat+"&longitude="+
                          response.data[0].lon+"&hourly=temperature_2m,precipitation_probability,weathercode&models=best_match&current_weather=true&forecast_days=1")
                    .then((response) => {
                        console.log(response.data);
                        setCurrentInfo(response.data);
                    })
                    .catch(() => console.error("Req weather info failed"))
            })
            .catch(() => console.error("Req city info failed"))
    }


    return(
        <Grid container sx={{ textAlign:'center' }}>
            <Grid item xs={12}>
                <FormControl sx={{ marginTop: 5, marginBottom:5 }}>
                    <InputLabel htmlFor="outlined-city">City</InputLabel>
                    <OutlinedInput
                        id="outlined-city"
                        label="City"
                        sx={{ borderRadius: 10 }}
                        onChange={handleChangeCity}
                    />
                    <Button
                        variant='contained'
                        sx={{ borderRadius: 10 }}
                        endIcon={<SearchIcon/>}
                        onClick={() => searchCity()}
                    >
                        Search
                    </Button>
                </FormControl>
            </Grid>
            {Object.keys(currentInfo).length !== 0 ?
                <>
                {cityPhoto.webformatURL !== undefined ?
                    <Grid item xs={12}>
                        <img src={cityPhoto.webformatURL} alt={cityPhoto.tags} style={{ borderRadius: 15 }}/>
                    </Grid>
                :   <></>
                }    
                    <Grid item xs={12}>    
                        <Typography variant='h6'>
                            Temperature:
                            {currentInfo.current_weather.temperature + currentInfo.hourly_units.temperature_2m}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            Weather code(WMO code): 
                            {weatherByWmoCode[currentInfo.current_weather.weathercode]}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            Precipitation probability:
                            {currentInfo.current_weather.is_day + currentInfo.hourly_units.precipitation_probability}
                        </Typography>
                    </Grid>
                </>
            :   <></> }
        </Grid>
    )
}