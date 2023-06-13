import { useEffect, useState } from "react"
import axios from "axios"
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, CircularProgress, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { convertHourlyTime, degreesToDirection, getNext7DaysInfo } from "../utils/weatherUtils";

export default function SeaInfo(props){
    const coordinates = props.coordinates;

    const [seaInfo, setSeaInfo] = useState({});

    useEffect(() => {
        console.log("SeaInfo mounted and coordinates been passed :", coordinates)
        axios.get("https://marine-api.open-meteo.com/v1/marine?latitude="+coordinates.lat+
                    "&longitude="+coordinates.lon+"&hourly=wave_height,wave_direction,wave_period&daily=wave_height_max,wave_direction_dominant,wave_period_max&length_unit=metric&timezone=auto")
            .then((response) => {
                console.log("resp sea info :", response.data)
                setSeaInfo(response.data)
            })
            .catch(() => console.error("Req sea info failed"))
    }, [coordinates])

    console.log("set sea Info ", seaInfo);
    
    //another way to filter arrays in an object...result is equal to use getDailyInfo from utils
    let hourlySeaToday = {};
    for(let key in seaInfo.hourly){
        hourlySeaToday[key] = seaInfo.hourly[key].slice(0, 24)
    }
    console.log("hourly sea TODAY ", hourlySeaToday)
    
    let dailySea = seaInfo.daily;
    let units = seaInfo.hourly_units;

    return (
        <Grid item xs={6}>
            <Card>
                <CardHeader title="Sea card" />
                <CardContent>
                { Object.keys(seaInfo).length !== 0 ? <>
                    <Accordion elevation={5}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded/>}
                            aria-controls="houlrySea-content"
                            id="hourlySea-header"
                            >
                            <Typography>Today</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { hourlySeaToday.time.map((hour, index) =>
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Wave height</TableCell>
                                            { hourlySeaToday.wave_height.map((waveHeight, index) =>
                                                <TableCell key={index}>
                                                    {waveHeight}&nbsp;{units.wave_height}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wave direction</TableCell>
                                            { hourlySeaToday.wave_direction.map((waveDirection, index) =>
                                                <TableCell key={index}>
                                                    {degreesToDirection(waveDirection)}&nbsp;({waveDirection + units.wave_direction})
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wave period</TableCell>
                                            { hourlySeaToday.wave_period.map((wavePeriod, index) =>
                                                <TableCell key={index}>
                                                    {wavePeriod}&nbsp;{units.wave_period}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Wave height MAX</TableCell>
                                            <TableCell>Dominant wave direction</TableCell>
                                            <TableCell>Wave period MAX</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{ dailySea.wave_height_max[0] }&nbsp;{ units.wave_height }</TableCell>
                                            <TableCell>
                                                { degreesToDirection(dailySea.wave_direction_dominant[0]) }&nbsp;
                                                ({dailySea.wave_direction_dominant[0] + units.wave_direction})
                                            </TableCell>
                                            <TableCell>{ dailySea.wave_period_max[0] }&nbsp;{ units.wave_period }</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={5}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded />}
                            aria-controls="dailySea-content"
                            id="dailySea-header"
                            >
                            <Typography>Next 7 days</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { getNext7DaysInfo(seaInfo.hourly.time).map((hour, index) =>
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Wave height</TableCell>
                                            { getNext7DaysInfo(seaInfo.hourly.wave_height).map((waveHeight, index) =>
                                                <TableCell key={index}>
                                                    {waveHeight}&nbsp;{units.wave_height}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wave direction</TableCell>
                                            { getNext7DaysInfo(seaInfo.hourly.wave_direction).map((waveDirection, index) =>
                                                <TableCell key={index}>
                                                    {degreesToDirection(waveDirection)} ({waveDirection + units.wave_direction})
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wave period</TableCell>
                                            { getNext7DaysInfo(seaInfo.hourly.wave_period).map((wavePeriod, index) =>
                                                <TableCell key={index}>
                                                    {wavePeriod}&nbsp;{units.wave_period}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion></>
                 :  <Tooltip title="Loading information, wait please...">
                        <CircularProgress
                            color="primary"
                            thickness={5}
                        />
                    </Tooltip>    
                }
                </CardContent>
            </Card>
        </Grid>
    )
}