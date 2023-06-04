import { Grid } from "@mui/material";
import SolarInfo from "./SolarInfo";
import WindInfo from "./WindInfo";

export default function AdditionalInfo(props){
    console.log("addinfo prop: ", props.coordinates)
    return(
        <Grid container spacing={3}>
            { (props.coordinates === null || props.coordinates === undefined) ?
                <>
                    null
                </>
             :  <>  
                    <SolarInfo coordinates={props.coordinates}/>
                    <WindInfo coordinates={props.coordinates}/>
                </>
            }
        </Grid>
    )
}