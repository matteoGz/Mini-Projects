import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import WeatherPage from "./pages/WeatherPage";
import TemperaturePage from "./pages/TemperaturePage";
import AdditionalInfoPage from "./pages/AdditionalInfoPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
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
        gpsPosition.latitude = position.coords.latitude
        gpsPosition.longitude = position.coords.longitude
      },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        //if user block access to position => ask city to retrieve coordinates
      }
    );
  } else {
    console.log("Not Available gpsDetection");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage position={gpsPosition}/>}/>
        <Route path="/weather" element={<WeatherPage/>} />
        <Route path="/temperatures" element={<TemperaturePage/>} />
        <Route path="/additional_info" element={<AdditionalInfoPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
