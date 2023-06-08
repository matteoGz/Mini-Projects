import { useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import SolarInfo from "./SolarInfo";
import WindInfo from "./WindInfo";
import SeaInfo from "./SeaInfo";
import AirInfo from "./AirInfo";

export default function AdditionalInfo(props){
    let coordinates = props.coordinates;
    console.log("addinfo prop: ", coordinates)

    const [loading, setLoading] = useState(true)
    setTimeout(() => setLoading(false), 2000)

    return(
        <Grid container spacing={3} justifyContent='center' alignItems='center'>
            { (coordinates === null || coordinates === undefined) ?
                <>
                    no coordinates set
                </>
             :  <> 
                { !loading ?
                    <>  
                        <Grid item xs='auto'>
                            <Typography variant="h6">{coordinates.display_name}</Typography>
                        </Grid>
                        <SolarInfo coordinates={coordinates} />
                        <WindInfo coordinates={coordinates} />
                        <AirInfo coordinates={coordinates} />
                        <SeaInfo coordinates={coordinates} />
                    </>
                 :  <Grid item xs='auto'>
                        <CircularProgress
                            color="primary"
                            thickness={5}
                            />
                    </Grid>
                }  
                </>
            }
        </Grid>
    )
}