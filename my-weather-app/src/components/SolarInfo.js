import { useEffect, useState } from "react"
import axios from "axios"
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { uvIndex } from "../models/uvIndex";
import { convertHourlyTime, getDailyInfo, getNext7DaysInfo } from "../utils/weatherUtils";
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

export default function SolarInfo(props){
    const coordinates = props.coordinates;

    const [solarInfo, setSolarInfo] = useState({});

    useEffect(() => {
        console.log("SolarInfo mounted and coordinates been passed :", coordinates)
        axios.get("https://api.open-meteo.com/v1/forecast?latitude="+coordinates.lat+
                    "&longitude="+coordinates.lon+"&hourly=uv_index&models=best_match&daily=sunrise,sunset,uv_index_max&timezone=auto")
            .then((response) => {
                console.log("resp solar info :", response.data)
                setSolarInfo(response.data)
            })
            .catch(() => console.error("Req solar info failed"))
    }, [coordinates])

    console.log("setted solar info: ",solarInfo);
    let hourlySolar = solarInfo.hourly;
    let dailySolar = solarInfo.daily;

    return (
        <Grid item xs={6}>
            <Card>
                <CardHeader title="Solar card" />
                <CardContent>
                { Object.keys(solarInfo).length !== 0 ? <>
                    <Accordion elevation={5}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded/>}
                            aria-controls="hourlyUvIndex-content"
                            id="hourlyUvIndex-header"
                            >
                            <Typography>Today</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { getDailyInfo(hourlySolar.time).map((hour, index) =>
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>UV Index</TableCell>
                                            { getDailyInfo(hourlySolar.uv_index).map((uvInd, index) =>
                                                <TableCell key={index}>
                                                    {uvInd}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sunrise</TableCell>
                                            <TableCell>Sunset</TableCell>
                                            <TableCell>UV Index MAX</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{convertHourlyTime(dailySolar.sunrise[0])}</TableCell>
                                            <TableCell>{convertHourlyTime(dailySolar.sunset[0])}</TableCell>
                                            <TableCell>{dailySolar.uv_index_max[0]}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>    
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={5}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded />}
                            aria-controls="dailySolarInfo-content"
                            id="dailySolarInfo-header"
                            >
                            <Typography>Next 7 days</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { getNext7DaysInfo(hourlySolar.time).map((hour, index) =>
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>UV Index</TableCell>
                                            { getNext7DaysInfo(hourlySolar.uv_index).map((uvInd, index) =>
                                                <TableCell key={index}>
                                                    {uvInd}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion></>
                  : <>Impossible to retrive information: Try to reload.</> }
                </CardContent>
            </Card>
        </Grid>
    )
}