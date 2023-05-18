import React, { useState } from "react"
import axios from "axios"
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Zoom } from "@mui/material"
import { convertHourlyTime, getDailyInfo } from "../utils/weatherUtils";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import CloseIcon from '@mui/icons-material/Close'
import { PulseIcon } from '@primer/octicons-react';

//api Key to retrieve photo of selected city
const photoKey = "36153502-ff5ba4e1922e4ae564dfa46bd";

export default function Temperature(){
    const[selectedCity, setSelectedCity] = useState('')
    const[coordinates, setCoordinates] = useState({});
    const[cityPhoto, setCityPhoto] = useState({});
    const[temperatureInfo, setTemperatureInfo] = useState({});

    const[open, setOpen] = useState(false);

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
            //to get temperatures info
                axios.get("https://api.open-meteo.com/v1/forecast?latitude="+response.data[0].lat+"&longitude="+
                          response.data[0].lon+"&hourly=temperature_2m,apparent_temperature&models=best_match&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&timezone=Europe%2FBerlin")
                    .then((response) => {
                        console.log(response.data);
                        setTemperatureInfo(response.data);
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
            {Object.keys(temperatureInfo).length !== 0 ?
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
                                onClick={() => setOpen(true)}
                            >
                                <PulseIcon size={35}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    { open ? 
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle fontSize={25}>
                                Today minimum and maximum temperature
                                <IconButton
                                    sx={{ marginInlineStart: 3 }}
                                    onClick={() => setOpen(false)}
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
                </>
             :   <></> }
        </Grid>
    )
}