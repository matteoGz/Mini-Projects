import Content from "../components/Content";
import DrawerApp from "../components/DrawerApp";

export default function TemperatureScreen(){
    console.log("Temperature screen...")
    return(
        <>
            {/* <AppHeader/> */}
            {DrawerApp}
            <Content/>
            {/* <Footer/> */}
        </>
    )
}