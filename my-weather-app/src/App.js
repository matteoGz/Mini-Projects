import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import WeatherPage from "./pages/WeatherPage";
import TemperaturePage from "./pages/TemperaturePage";
import AdditionalInfoPage from "./pages/AdditionalInfoPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, Input, InputLabel, Modal, Typography } from "@mui/material";
import { SearchIcon } from "@primer/octicons-react";

function App() {
  const [ toSetPosition, setToSetPosition ] = useState(false);
  const [ alertInsert, setAlertInsert ] = useState(false);
  const [ changedManualPosition, setChangedManualPosition ] = useState(null);
  const [ manualPosition, setManualPosition ] = useState(null);

  let gpsPosition = {
    latitude: undefined,
    longitude: undefined
  }
  //get gps location
  if("geolocation" in navigator){
    console.log("Available gpsDetection");
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setToSetPosition(false)
        gpsPosition.latitude = position.coords.latitude
        gpsPosition.longitude = position.coords.longitude
      },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        //if user block access to position => ask city to retrieve coordinates
        setToSetPosition(true)
      }
    );
  } else {
    console.log("Not Available gpsDetection");
    //set manual as before
    setToSetPosition(true)

  }

  useEffect(() => {
    insertPosition()
  }, [toSetPosition])
  
  const insertPosition = () => {
    console.log("insert position modal")
    return(
      <Modal
        open={toSetPosition}
        onClose={() => setAlertInsert(true)}
        aria-labelledby="modal-insertPosition-title"
        aria-describedby="modal-insertPosition-description"
      >
        <Box>
          <Typography id="modal-insertPosition-title">Gps detection inactive</Typography>
          <Typography id="modal-insertPosition-description">Please insert a city</Typography>
          <FormControl variant="outlined" required>
            <InputLabel htmlFor="insertPosition">City</InputLabel>
            <Input
              id="insertPosition"
              placeholder="Insert a city..."
              aria-describedby="insertPosition-helperText"
              onChange={(event) => setChangedManualPosition(event.target.value)}
            />
            <FormHelperText id="insertPosition-helperText">Helper text sample</FormHelperText>
            <IconButton
              size="large"
              color="primary"
              onClick={() => setManualPosition(changedManualPosition)}
            >{console.log("searching for position..."+changedManualPosition)}
              <SearchIcon />
            </IconButton>
          </FormControl>
          {/* to set manual position! */}
        </Box>
      </Modal> 
    )
  }

  useEffect(() => {
    backToInsertPosition()
    //show alert dialog...and back to modal 'insert position'
  }, [alertInsert])

  const backToInsertPosition = () => {
    console.log("alert backToInsert")
    return(
      <Dialog
        open={alertInsert}
        onClose={() => setAlertInsert(false)}
      >
        <DialogTitle></DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage position={(gpsPosition !== undefined) && !toSetPosition ? gpsPosition : manualPosition}/>}/>
        <Route path="/weather" element={<WeatherPage/>} />
        <Route path="/temperatures" element={<TemperaturePage/>} />
        <Route path="/additional_info" element={<AdditionalInfoPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
