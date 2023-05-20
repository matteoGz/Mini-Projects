import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import WeatherPage from "./pages/WeatherPage";
import TemperaturePage from "./pages/TemperaturePage";
import AdditionalInfoPage from "./pages/AdditionalInfoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/weather" element={<WeatherPage/>} />
        <Route path="/temperatures" element={<TemperaturePage/>} />
        <Route path="/additional_info" element={<AdditionalInfoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
