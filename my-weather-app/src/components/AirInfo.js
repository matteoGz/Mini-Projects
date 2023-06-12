import { useEffect, useState } from "react"
import axios from "axios"
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { convertHourlyTime, getDailyInfo, getNext7DaysInfo } from "../utils/weatherUtils";

export default function AirInfo(props){
    const coordinates = props.coordinates;

    const [airInfo, setAirInfo] = useState({});

    useEffect(() => {
        console.log("AirInfo mounted and coordinates been passed :", coordinates)
        axios.get("https://air-quality-api.open-meteo.com/v1/air-quality?latitude="+coordinates.lat+
                    "&longitude="+coordinates.lon+"&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen,european_aqi,european_aqi_pm2_5,european_aqi_pm10,european_aqi_no2,european_aqi_o3,european_aqi_so2&timezone=auto")
            .then((response) => {
                console.log("resp air info :", response.data)
                setAirInfo(response.data)
            })
            .catch(() => console.error("Req air info failed"))
    }, [coordinates])

    let hourlyAir = airInfo.hourly;
    let units = airInfo.hourly_units;

    console.log("length of pollen info: "+((airInfo.hourly.alder_pollen).length)/24); //days of shown pollen info (5)
    console.log("length of euAQI: "+((airInfo.hourly.european_aqi).length)/24)

    return (
        <Grid item xs={6}>
            <Card>
                <CardHeader title="Air quality card" />
                <CardContent>
                { Object.keys(airInfo).length !== 0 ? <>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreRounded />}
                            aria-controls="hourlyAir-content"
                            id="hourlyAir-header"
                            >
                            <Typography>Today</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { getDailyInfo(hourlyAir.time).map((hour, index) =>
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )    
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>PM-10</strong></TableCell>
                                            { getDailyInfo(hourlyAir.pm10).map((pm10, index) =>
                                                <TableCell key={index}>
                                                    { pm10 }&nbsp;{ units.pm10 }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>PM-2.5</TableCell>
                                            { getDailyInfo(hourlyAir.pm2_5).map((pm2_5, index) =>
                                                <TableCell key={index}>
                                                    { pm2_5 }&nbsp;{ units.pm2_5 }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Carbon Monoxide</TableCell>
                                            { getDailyInfo(hourlyAir.carbon_monoxide).map((CO, index) =>
                                                <TableCell key={index}>
                                                    { CO }&nbsp;{ units.carbon_monoxide }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Nitrogen Dioxide</TableCell>
                                            { getDailyInfo(hourlyAir.nitrogen_dioxide).map((NO2, index) =>
                                                <TableCell key={index}>
                                                    { NO2 }&nbsp;{ units.nitrogen_dioxide }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Sulphure Dioxide</TableCell>
                                            { getDailyInfo(hourlyAir.sulphur_dioxide).map((SO2, index) =>
                                                <TableCell key={index}>
                                                    { SO2 }&nbsp;{ units.sulphur_dioxide }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Ozone</TableCell>
                                            { getDailyInfo(hourlyAir.ozone).map((O3, index) =>
                                                <TableCell key={index}>
                                                    { O3 }&nbsp;{ units.ozone }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Alder pollen</TableCell>
                                            { getDailyInfo(hourlyAir.alder_pollen).map((alderPollen, index) =>
                                                <TableCell key={index}>
                                                    { alderPollen }&nbsp;{ units.alder_pollen }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Birch pollen</TableCell>
                                            { getDailyInfo(hourlyAir.birch_pollen).map((birchPollen, index) =>
                                                <TableCell key={index}>
                                                    { birchPollen }&nbsp;{ units.birch_pollen }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Grass pollen</TableCell>
                                            { getDailyInfo(hourlyAir.grass_pollen).map((grassPollen, index) =>
                                                <TableCell key={index}>
                                                    { grassPollen }&nbsp;{ units.grass_pollen }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Mugwort pollen</TableCell>
                                            { getDailyInfo(hourlyAir.mugwort_pollen).map((mugwortPollen, index) =>
                                                <TableCell key={index}>
                                                    { mugwortPollen }&nbsp;{ units.mugwort_pollen }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Olive pollen</TableCell>
                                            { getDailyInfo(hourlyAir.olive_pollen).map((olivePollen, index) =>
                                                <TableCell key={index}>
                                                    { olivePollen }&nbsp;{ units.olive_pollen }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Ragweed pollen</TableCell>
                                            { getDailyInfo(hourlyAir.ragweed_pollen).map((ragweedPollen, index) =>
                                                <TableCell key={index}>
                                                    { ragweedPollen }&nbsp;{ units.ragweed_pollen }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>European AQI</strong></TableCell>
                                            { getDailyInfo(hourlyAir.european_aqi).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>     
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>European AQI - PM 2.5</TableCell>
                                            { getDailyInfo(hourlyAir.european_aqi_pm2_5).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - PM 10</TableCell>
                                            { getDailyInfo(hourlyAir.european_aqi_pm10).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - NO^2</TableCell>
                                            { getDailyInfo(hourlyAir.european_aqi_no2).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - O^3</TableCell>
                                            { getDailyInfo(hourlyAir.european_aqi_o3).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - SO^2</TableCell>
                                            { getDailyInfo(hourlyAir.european_aqi_so2).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={5}>
                        <AccordionSummary>
                            <Typography>Next 7 days</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            { getNext7DaysInfo(hourlyAir.time).map((hour, index) => 
                                                <TableCell key={index}>
                                                    { convertHourlyTime(hour) }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    <TableRow>
                                        {/* to modify getNext7DaysInfo to getNext5DaysInfo for pollen info */}
                                            <TableCell><strong>PM-10</strong></TableCell>
                                            { getNext7DaysInfo(hourlyAir.pm10).map((pm10, index) =>
                                                <TableCell key={index}>
                                                    { pm10 }&nbsp;{ units.pm10 }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>PM-2.5</TableCell>
                                            { getNext7DaysInfo(hourlyAir.pm2_5).map((pm2_5, index) =>
                                                <TableCell key={index}>
                                                    { pm2_5 }&nbsp;{ units.pm2_5 }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Carbon Monoxide</TableCell>
                                            { getNext7DaysInfo(hourlyAir.carbon_monoxide).map((CO, index) =>
                                                <TableCell key={index}>
                                                    { CO }&nbsp;{ units.carbon_monoxide }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Nitrogen Dioxide</TableCell>
                                            { getNext7DaysInfo(hourlyAir.nitrogen_dioxide).map((NO2, index) =>
                                                <TableCell key={index}>
                                                    { NO2 }&nbsp;{ units.nitrogen_dioxide }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Sulphure Dioxide</TableCell>
                                            { getNext7DaysInfo(hourlyAir.sulphur_dioxide).map((SO2, index) =>
                                                <TableCell key={index}>
                                                    { SO2 }&nbsp;{ units.sulphur_dioxide }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Ozone</TableCell>
                                            { getNext7DaysInfo(hourlyAir.ozone).map((O3, index) =>
                                                <TableCell key={index}>
                                                    { O3 }&nbsp;{ units.ozone }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Alder pollen</TableCell>
                                            { getNext7DaysInfo(hourlyAir.alder_pollen).map((alderPollen, index) =>
                                                <TableCell key={index}>
                                                    { alderPollen !== null ? alderPollen+" "+units.alder_pollen : "-" }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Birch pollen</TableCell>
                                            { getNext7DaysInfo(hourlyAir.birch_pollen).map((birchPollen, index) =>
                                                <TableCell key={index}>
                                                    { birchPollen !== null ? birchPollen+" "+units.birch_pollen : "-" }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Grass pollen</TableCell>
                                            { getNext7DaysInfo(hourlyAir.grass_pollen).map((grassPollen, index) =>
                                                <TableCell key={index}>
                                                    { grassPollen !== null ? grassPollen+" "+units.grass_pollen : "-" }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Mugwort pollen</TableCell>
                                            { getNext7DaysInfo(hourlyAir.mugwort_pollen).map((mugwortPollen, index) =>
                                                <TableCell key={index}>
                                                    { mugwortPollen !== null ? mugwortPollen+" "+units.mugwort_pollen : "-" }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Olive pollen</TableCell>
                                            { getNext7DaysInfo(hourlyAir.olive_pollen).map((olivePollen, index) =>
                                                <TableCell key={index}>
                                                    { olivePollen !== null ? olivePollen+" "+units.olive_pollen : "-" }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Ragweed pollen</TableCell>
                                            { getNext7DaysInfo(hourlyAir.ragweed_pollen).map((ragweedPollen, index) =>
                                                <TableCell key={index}>
                                                    { ragweedPollen !== null ? ragweedPollen+" "+units.ragweed_pollen : "-" }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>European AQI</strong></TableCell>
                                            { getNext7DaysInfo(hourlyAir.european_aqi).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - PM 2.5</TableCell>
                                            { getNext7DaysInfo(hourlyAir.european_aqi_pm2_5).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - PM 10</TableCell>
                                            { getNext7DaysInfo(hourlyAir.european_aqi_pm10).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - NO^2</TableCell>
                                            { getNext7DaysInfo(hourlyAir.european_aqi_no2).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - O^3</TableCell>
                                            { getNext7DaysInfo(hourlyAir.european_aqi_o3).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>European AQI - SO^2</TableCell>
                                            { getNext7DaysInfo(hourlyAir.european_aqi_so2).map((euAQI, index) =>
                                                <TableCell key={index}>
                                                    { euAQI }
                                                </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion></>
                 :  <>Impossible to retrive information</>    
                }
                </CardContent>
            </Card>
        </Grid>
    )
}