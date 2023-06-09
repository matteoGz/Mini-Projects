import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

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

    return (
        <Grid item xs={6}>
            <Card>
                <CardHeader title="Sea card" />
                <CardContent>
                { Object.keys(seaInfo).length !== 0 ?
                    <>Retrieved...to complete with some info...</>
                 :  <>Impossible to retrive information</>    
                }
                </CardContent>
            </Card>
        </Grid>
    )
}