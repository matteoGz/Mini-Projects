import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import WeatherPage from "./pages/WeatherPage";
import TemperaturePage from "./pages/TemperaturePage";
import AdditionalInfoPage from "./pages/AdditionalInfoPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Typography } from "@mui/material";

function App() {
  const [ toSetPosition, setToSetPosition ] = useState(false);
  const [ alertInsert, setAlertInsert ] = useState(false)
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
    return(
      <Modal
        open={toSetPosition}
        onClose={() => setAlertInsert(true)}
        aria-labelledby="modal-insertPosition-title"
        aria-describedby="modal-insertPosition-description"
      >
        <Box>
          <Typography id="modal-insertPosition-title">Text in a modal</Typography>
          <Typography id="modal-insertPosition-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Typography>
          {/* to set manual position! */}
        </Box>
      </Modal> 
    )
  }

  useEffect(() => {
    setToSetPosition(true)
    backToInsertPosition()
    //show alert dialog...and back to modal 'insert position'
  }, [alertInsert])

  const backToInsertPosition = () => {
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
        <Route path="/" element={<Homepage position={gpsPosition !== undefined ? gpsPosition : manualPosition}/>}/>
        <Route path="/weather" element={<WeatherPage/>} />
        <Route path="/temperatures" element={<TemperaturePage/>} />
        <Route path="/additional_info" element={<AdditionalInfoPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
