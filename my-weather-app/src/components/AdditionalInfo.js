import { CircularProgress, Grid, Typography } from "@mui/material";
import SolarInfo from "./SolarInfo";
import WindInfo from "./WindInfo";
import { useState } from "react";

export default function AdditionalInfo(props){
    let coordinates = props.coordinates;
    console.log("addinfo prop: ", coordinates)

    const [loading, setLoading] = useState(true)
    setTimeout(() => setLoading(false), 2000)

    return(
        <Grid container spacing={3}>
            { (coordinates === null || coordinates === undefined) ?
                <>
                    null
                </>
             :  <> 
                { !loading ?
                    <>  
                        <Grid item xs={12}>
                            <Typography variant="h6">{coordinates.display_name}</Typography>
                        </Grid>
                        <SolarInfo coordinates={coordinates}/>
                        <WindInfo coordinates={coordinates}/>
                    </>
                 :  <CircularProgress />
                }  
                </>
            }
        </Grid>
    )
}