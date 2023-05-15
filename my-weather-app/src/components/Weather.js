import React, { useState } from 'react'
import axios from 'axios'
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, FormControl, Grid, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { weatherByWmoCode } from '../models/weatherByWmoCode';
import { convertHourlyTime, getDailyInfo, getNext7DaysInfo } from '../utils/weatherUtils';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

//api Key to retrieve photo of selected city
const photoKey = "36153502-ff5ba4e1922e4ae564dfa46bd";

export default function Weather(){
    const[selectedCity, setSelectedCity] = useState('')
    const[coordinates, setCoordinates] = useState({});
    const[cityPhoto, setCityPhoto] = useState({});
    const[weatherInfo, setWeatherInfo] = useState({});

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
                          response.data[0].lon+"&hourly=temperature_2m,precipitation_probability,weathercode&models=best_match&current_weather=true&timezone=Europe%2FBerlin")
                    .then((response) => {
                        console.log(response.data);
                        setWeatherInfo(response.data);
                    })
                    .catch(() => console.error("Req weather info failed"))
            })
            .catch(() => console.error("Req city info failed"))
    }

    console.log("coordinates: ", coordinates);
    let hourlyWeather = weatherInfo.hourly;

    return(
        <Grid container
            sx={{
                borderRadius: 10, 
                backgroundImage: 'url('+cityPhoto.largeImageURL+')',
                backgroundSize:"cover",
                backgroundRepeat:'no-repeat',
                minHeight: "500px"
            }}
            >
            <Grid item xs={2}>
                <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
                    <CardContent>
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
                    </CardContent>
                </Card>
            </Grid>
            {Object.keys(weatherInfo).length !== 0 ?
                <> 
                    <Grid item xs={4} marginX={'33.33%'}>    
                        <Card elevation={5} sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: 10 }}>
                            <CardContent>
                                <Typography variant='h6'>
                                    Temperature:
                                    {weatherInfo.current_weather.temperature + weatherInfo.hourly_units.temperature_2m}
                                </Typography>
                                <Typography variant='h6'>
                                    Weather code(WMO code): 
                                    {weatherByWmoCode[weatherInfo.current_weather.weathercode]}
                                </Typography>
                                <Typography variant='h6'>
                                    Precipitation probability:
                                    {weatherInfo.current_weather.is_day + weatherInfo.hourly_units.precipitation_probability}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                { //today hourly weather 
                 Object.keys(hourlyWeather).length > 0 ?
                    <Grid item xs={9}>
                        <Accordion elevation={5}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded/>}
                                aria-controls="hourlyWeather-content"
                                id="hourlyWeather-header"
                                >
                                <Typography>Today</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Time</TableCell>
                                                { getDailyInfo(hourlyWeather.time).map((hour, index) =>
                                                    <TableCell key={index}>
                                                        { convertHourlyTime(hour) }
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Temperature</TableCell>
                                                { getDailyInfo(hourlyWeather.temperature_2m).map((temperature, index) =>
                                                    <TableCell key={index}>
                                                        {temperature + weatherInfo.hourly_units.temperature_2m}
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Sky</TableCell>
                                                { getDailyInfo(hourlyWeather.weathercode).map((weather, index) =>
                                                    <TableCell key={index}>
                                                        {weatherByWmoCode[weather]}
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Precipitation probability</TableCell>
                                                { getDailyInfo(hourlyWeather.precipitation_probability).map((precipitationp, index) =>
                                                    <TableCell key={index}>
                                                        {precipitationp + weatherInfo.hourly_units.precipitation_probability}
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>    
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                 :  <></> }

                { //next 7days weather 
                 Object.keys(hourlyWeather).length > 0 ?
                    <Grid item xs={9}>
                        <Accordion elevation={5}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded/>}
                                aria-controls="hourlyWeather-content"
                                id="hourlyWeather-header"
                                >
                                <Typography>Next 7 days</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Time</TableCell>
                                                { getNext7DaysInfo(hourlyWeather.time).map((hour, index) =>
                                                    <TableCell key={index}>
                                                        { convertHourlyTime(hour) }
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Temperature</TableCell>
                                                { getNext7DaysInfo(hourlyWeather.temperature_2m).map((temperature, index) =>
                                                    <TableCell key={index}>
                                                        {temperature + weatherInfo.hourly_units.temperature_2m}
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Sky</TableCell>
                                                { getNext7DaysInfo(hourlyWeather.weathercode).map((weather, index) =>
                                                    <TableCell key={index}>
                                                        {weatherByWmoCode[weather]}
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Precipitation probability</TableCell>
                                                { getNext7DaysInfo(hourlyWeather.precipitation_probability).map((precipitationp, index) =>
                                                    <TableCell key={index}>
                                                        {precipitationp + weatherInfo.hourly_units.precipitation_probability}
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>    
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                 :  <></>
                
                
                }
             </>
            :   <></> }
        </Grid>
    )
}