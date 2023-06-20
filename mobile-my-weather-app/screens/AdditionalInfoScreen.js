import Content from "../components/Content";
import DrawerApp from "../components/DrawerApp";

export default function AdditionalInfoScreen(){
    console.log("Add info screen...")
    return(
        <>
            {/* <AppHeader/> */}
            {DrawerApp}
            <Content/>
            {/* <Footer/> */}
        </>
    )
}