import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { convertHourlyTime, degreesToDirection, getDailyInfo, getNext7DaysInfo } from "../utils/weatherUtils";

export default function WindInfo(props){
    const coordinates = props.coordinates;

    const [windInfo, setWindInfo] = useState({});

    useEffect(() => {
        axios.get("https://api.open-meteo.com/v1/forecast?latitude="+coordinates.lat+"&longitude="+coordinates.lon+
                  "&hourly=windspeed_10m,winddirection_10m,windgusts_10m&models=best_match&daily=windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=auto")
            .then((response) => {
                console.log("resp wind info: ",response.data)
                setWindInfo(response.data)
            })
            .catch(() => console.error("Req wind info failed"))
    }, [coordinates])

    let hourlyWind = windInfo.hourly;
    let units = windInfo.hourly_units;
    let dailyWind = windInfo.daily;

    return(
        <Grid item xs={6}>
            <Card>
                <CardHeader title="Wind card"/>
                <CardContent>
                { Object.keys(windInfo).length !== 0 ? <>
                    <Accordion elevation={5}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded/>}
                            aria-controls="hourlyWind-content"
                            id="hourlyWind-header"
                            >
                            <Typography>Today</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { getDailyInfo(hourlyWind.time).map((hour, index) =>
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Wind speed</TableCell>
                                            { getDailyInfo(hourlyWind.windspeed_10m).map((windSpeed, index) =>
                                                <TableCell key={index}>
                                                    {windSpeed}&nbsp;{units.windspeed_10m}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wind direction</TableCell>
                                            { getDailyInfo(hourlyWind.winddirection_10m).map((windDirection, index) =>
                                                <TableCell key={index}>
                                                    {degreesToDirection(windDirection)}&nbsp;({windDirection + units.winddirection_10m})
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wind gusts</TableCell>
                                            { getDailyInfo(hourlyWind.windgusts_10m).map((windGusts, index) =>
                                                <TableCell key={index}>
                                                    {windGusts}&nbsp;{units.windgusts_10m}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Wind speed MAX</TableCell>
                                            <TableCell>Dominant wind direction</TableCell>
                                            <TableCell>Wind gusts MAX</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{ dailyWind.windspeed_10m_max[0] }&nbsp;{ units.windspeed_10m }</TableCell>
                                            <TableCell>
                                                { degreesToDirection(dailyWind.winddirection_10m_dominant[0]) }&nbsp;
                                                ({dailyWind.winddirection_10m_dominant[0] + units.winddirection_10m})
                                            </TableCell>
                                            <TableCell>{ dailyWind.windgusts_10m_max[0] }&nbsp;{ units.windgusts_10m }</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={5}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded />}
                            aria-controls="dailyWind-content"
                            id="dailyWind-header"
                            >
                            <Typography>Next 7 days</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { getNext7DaysInfo(hourlyWind.time).map((hour, index) =>
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Wind speed</TableCell>
                                            { getNext7DaysInfo(hourlyWind.windspeed_10m).map((windSpeed, index) =>
                                                <TableCell key={index}>
                                                    {windSpeed}&nbsp;{units.windspeed_10m}
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wind direction</TableCell>
                                            { getNext7DaysInfo(hourlyWind.winddirection_10m).map((windDirection, index) =>
                                                <TableCell key={index}>
                                                    {degreesToDirection(windDirection)} ({windDirection + units.winddirection_10m})
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wind gusts</TableCell>
                                            { getNext7DaysInfo(hourlyWind.windgusts_10m).map((windGusts, index) =>
                                                <TableCell key={index}>
                                                    {windGusts}&nbsp;{units.windgusts_10m}
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