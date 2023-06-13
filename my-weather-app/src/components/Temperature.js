import React, { useEffect, useState } from "react"
import axios from "axios"
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Zoom } from "@mui/material"
import { convertDateFormat, convertHourlyTime, getDailyInfo, getNext7DaysInfo } from "../utils/weatherUtils";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import CloseIcon from '@mui/icons-material/Close'
import { PulseIcon, SunIcon } from '@primer/octicons-react';
import { Link } from "react-router-dom";
import { photoKey } from "../api/apiKey";

export default function Temperature(){
    const [isSearched, setIsSearched] = useState(false);

    const[selectedCity, setSelectedCity] = useState('');
    const[coordinates, setCoordinates] = useState({});
    const[cityPhoto, setCityPhoto] = useState({});
    const[temperatureInfo, setTemperatureInfo] = useState({});

    const[openToday, setOpenToday] = useState(false);
    const[openNextD, setOpenNextD] = useState(false);

    const handleChangeCity= (event) => {
        setSelectedCity(event.target.value)
    }

    useEffect(() => {
    //to get selected city's photo
        if(Object.keys(coordinates).length!==0){
            let cityInfo = (coordinates.display_name).split(",")
            let cityName = cityInfo[0].trim()
            axios.get("https://pixabay.com/api/?key="+photoKey+"&q="+cityName)
            .then((response)=> {
                if(response.data.hits.length > 0){
                    setCityPhoto(response.data.hits[0]);   
                } 
            })
            .catch(() => console.error("Req city photo failed"))
        }
    }, [coordinates])
    

    function searchCity() {
        setIsSearched(true)
    //to get coordinates of input city
        axios.get('https://nominatim.openstreetmap.org/search?q='+selectedCity+'&format=json')
            .then((response) => {
                if(response.data.length > 0){
                    setCoordinates(response.data[0]);
                    localStorage.setItem('coordinates', JSON.stringify(response.data[0]));
                } else{
                    console.warn("Insert a valid location")
                }
            //to get temperatures info
                axios.get("https://api.open-meteo.com/v1/forecast?latitude="+response.data[0].lat+"&longitude="+
                        response.data[0].lon+"&hourly=temperature_2m,apparent_temperature&models=best_match&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&timezone=Europe%2FBerlin")
                    .then((response) => {
                        console.log(response.data);
                        setTemperatureInfo(response.data);
                        setIsSearched(false)
                    })
                    .catch(() => console.error("Req temperatures info failed")) 
                })
            .catch(() => console.error("Req city info failed"))
    }

    console.log("coordinates: ", coordinates);
    let currentTemperature = temperatureInfo.current_weather
    let hourlyTemperature = temperatureInfo.hourly;
    let dailyTemperature = temperatureInfo.daily;

    return(
        <Grid container
            sx={{
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
            <Dialog open={isSearched}>
                <DialogContent>
                    <CircularProgress/>
                </DialogContent>
            </Dialog>
            { !isSearched ?
                <Grid item xs={10} marginX={'33.33%'} marginY={'-7%'}>
                    <Typography>{coordinates.display_name}</Typography>
                </Grid>
              : <></>
            }
            { Object.keys(temperatureInfo).length !== 0 ?
                <> 
                    <Grid item xs={4} marginX={'33.33%'}>    
                        <Card elevation={5} sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: 10 }}>
                            <CardContent>
                                <Typography variant="h6">
                                    Current temperature: {currentTemperature.temperature + temperatureInfo.hourly_units.temperature_2m}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                { //today hourly temperature 
                 Object.keys(hourlyTemperature).length > 0 ?
                  <>
                    <Grid item xs={9}>
                        <Accordion elevation={5}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreRounded/>}
                                aria-controls="hourlyTemperature-content"
                                id="hourlyTemperature-header"
                                >
                                <Typography>Today</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Time</TableCell>
                                                { getDailyInfo(hourlyTemperature.time).map((hour, index) =>
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
                                                { getDailyInfo(hourlyTemperature.temperature_2m).map((temperature, index) =>
                                                    <TableCell key={index}>
                                                        {temperature + temperatureInfo.hourly_units.temperature_2m}
                                                    </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Apparent temperature</TableCell>
                                                { getDailyInfo(hourlyTemperature.apparent_temperature).map((apparentTemp, index) =>
                                                    <TableCell key={index}>
                                                        {apparentTemp + temperatureInfo.hourly_units.apparent_temperature}
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
                    <Grid item xs={3}>
                        <Tooltip title="Show min / max temperature" TransitionComponent={Zoom}>
                            <Button
                                variant="contained"
                                onClick={() => setOpenToday(true)}
                            >
                                <PulseIcon size={35}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    { openToday ? 
                        <Dialog open={openToday} onClose={() => setOpenToday(false)}>
                            <DialogTitle fontSize={25}>
                                Today minimum and maximum temperature
                                <IconButton
                                    sx={{ marginInlineStart: 3 }}
                                    onClick={() => setOpenToday(false)}
                                    >
                                    <CloseIcon/>
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <Typography variant="h6">
                                    Max temperature: <strong>{dailyTemperature.temperature_2m_max[0] + temperatureInfo.daily_units.temperature_2m_max}</strong>
                                </Typography>
                                <Typography variant="h6">
                                    Min temperature: <strong>{dailyTemperature.temperature_2m_min[0] + temperatureInfo.daily_units.temperature_2m_min}</strong>
                                </Typography>
                                <Typography>
                                    Apparent max temperature: {dailyTemperature.apparent_temperature_max[0] + temperatureInfo.daily_units.apparent_temperature_max}
                                </Typography>
                                <Typography>
                                    Apparent min temperature: {dailyTemperature.apparent_temperature_min[0] + temperatureInfo.daily_units.apparent_temperature_min}
                                </Typography>
                            </DialogContent>
                        </Dialog>
                     : <></>
                    }
                  </> : <></> }
                { Object.keys(dailyTemperature).length > 0 ?
                    <>
                        <Grid item xs={9}>
                            <Accordion elevation={5}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreRounded/>}
                                    aria-controls="hourlyTemperature-content"
                                    id="hourlyTemperature-header"
                                    >
                                    <Typography>Next 7 days</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Time</TableCell>
                                                    { getNext7DaysInfo(hourlyTemperature.time).map((hour, index) =>
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
                                                    { getNext7DaysInfo(hourlyTemperature.temperature_2m).map((temperature, index) =>
                                                        <TableCell key={index}>
                                                            {temperature + temperatureInfo.hourly_units.temperature_2m}
                                                        </TableCell>
                                                        )
                                                    }
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Apparent temperature</TableCell>
                                                    { getNext7DaysInfo(hourlyTemperature.apparent_temperature).map((apparentTemp, index) =>
                                                        <TableCell key={index}>
                                                            {apparentTemp + temperatureInfo.hourly_units.apparent_temperature}
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
                        <Grid item xs={3}>
                            <Tooltip title="Show min / max temperature" TransitionComponent={Zoom}>
                                <Button
                                    variant="contained"
                                    onClick={() => setOpenNextD(true)}
                                >
                                    <PulseIcon size={35}/>
                                </Button>
                            </Tooltip>
                        </Grid>
                        { openNextD ?
                            <Dialog open={openNextD} onClose={() => setOpenNextD(false)}>
                                <DialogTitle fontSize={20}>
                                    Next 7 days minimum and maximum temperature
                                    <IconButton
                                        sx={{ marginInlineStart: 3 }}
                                        onClick={() => setOpenNextD(false)}
                                        >
                                    <CloseIcon/>
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Day</TableCell>
                                                    {dailyTemperature.time.map((day, index) => <TableCell key={index}>{convertDateFormat(day)}</TableCell>)}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Max temperature</TableCell>
                                                    {dailyTemperature.temperature_2m_max.map((maxTemp, index) => <TableCell key={index}>{maxTemp + temperatureInfo.daily_units.temperature_2m_max}</TableCell>)}
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Min temperature</TableCell>
                                                    {dailyTemperature.temperature_2m_min.map((minTemp, index) => <TableCell key={index}>{minTemp + temperatureInfo.daily_units.temperature_2m_min}</TableCell>)}
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Apparent max temperature</TableCell>
                                                    {dailyTemperature.apparent_temperature_max.map((apparentMaxTemp, index) => <TableCell key={index}>{apparentMaxTemp + temperatureInfo.daily_units.apparent_temperature_max}</TableCell>)}
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Apparent min temperature</TableCell>
                                                    {dailyTemperature.apparent_temperature_min.map((apparentMinTemp, index) => <TableCell key={index}>{apparentMinTemp + temperatureInfo.daily_units.apparent_temperature_min}</TableCell>)}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </DialogContent>
                            </Dialog>
                          : <></> }    
                    </> : <></> }
                    <Grid item xs={3}>
                        <Tooltip title="Show solar info" TransitionComponent={Zoom}>
                            <Link
                                to='/additional_info'
                                state={{ coordinates: coordinates }}
                            >
                                <Button
                                    variant="contained"
                                >
                                    <SunIcon size={30} />
                                </Button>
                            </Link>
                        </Tooltip>
                    </Grid>
                </> : <></> }
        </Grid>
    )
}