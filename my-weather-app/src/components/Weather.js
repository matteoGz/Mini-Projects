import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Weather(){
    const[selectedCity, setSelectedCity] = useState('')
    const[coordinates, setCoordinates] = useState({});
    const[currentInfo, setCurrentInfo] = useState({});

    const handleChangeCity= (event) => {
        setSelectedCity(event.target.value)
    }

    function searchCity() {
        axios.get('https://nominatim.openstreetmap.org/search?q='+selectedCity+'&format=json')
        .then((response) => {
            console.log(response.data[0]);
            setCoordinates(response.data[0]);
        })
        .catch(() => console.error("Req city info failed"))
        if(coordinates.lat && coordinates.lon !== undefined){
            axios.get("https://api.open-meteo.com/v1/forecast?latitude="+coordinates.lat+"&longitude="+coordinates.lon+"&hourly=temperature_2m,precipitation_probability,weathercode&models=best_match&current_weather=true&forecast_days=1")
            .then((response) => {
                console.log(response.data);
                setCurrentInfo(response.data);
            })
            .catch(() => console.error("Req weather info failed"))
        }
    }


    return(
        <>
        <FormControl sx={{ marginTop: 20}}>
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
        {Object.keys(currentInfo).length !== 0 ?
            <Box>
                <Typography variant='h6'>
                    Temperature:
                    {currentInfo.current_weather.temperature + currentInfo.hourly_units.temperature_2m}
                </Typography>
                <Typography variant='h6'>
                    Weather code(WMO code):
                    {currentInfo.current_weather.weathercode}
                </Typography>
                <Typography variant='h6'>
                    Precipitation probability:
                    {currentInfo.current_weather.is_day + currentInfo.hourly_units.precipitation_probability}
                </Typography>
            </Box>
        : <></>
        }
        </>
    )
}