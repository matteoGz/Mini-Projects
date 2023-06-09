import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

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

    return (
        <Grid item xs={6}>
            <Card>
                <CardHeader title="Air quality card" />
                <CardContent>
                { Object.keys(airInfo).length !== 0 ?
                    <>Retrieved...to complete with some info...</>
                 :  <>Impossible to retrive information</>    
                }
                </CardContent>
            </Card>
        </Grid>
    )
}