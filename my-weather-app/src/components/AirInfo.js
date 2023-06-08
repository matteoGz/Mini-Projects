import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

export default function AirInfo(props){
    const coordinates = props.coordinates;

    const [airInfo, setAirInfo] = useState({});

    useEffect(() => {
        console.log("AirInfo mounted and coordinates been passed :", coordinates)
        axios.get("https://api.open-meteo.com/v1/forecast?latitude="+coordinates.lat+
                    "&longitude="+coordinates.lon+"&hourly=uv_index&models=best_match&daily=sunrise,sunset,uv_index_max&timezone=auto")
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
                    <>Retrieved</>
                 :  <>Impossible to retrive information</>    
                }
                </CardContent>
            </Card>
        </Grid>
    )
}