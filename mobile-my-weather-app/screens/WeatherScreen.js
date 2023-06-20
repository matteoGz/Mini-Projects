import Content from "../components/Content";
import DrawerApp from "../components/DrawerApp";

export default function WeatherScreen(){
    console.log("Weather screen...")
    return(
        <>
            {/* <AppHeader/> */}
            {DrawerApp}
            <Content/>
            {/* <Footer/> */}
        </>
    )
}