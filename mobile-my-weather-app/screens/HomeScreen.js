import { Button } from "native-base";
import Content from "../components/Content";
import Footer from "../components/Footer";
import AppHeader from "../components/Header";
import TabNav from "../components/TabNav";

export default function HomeScreen({ navigation }){
    console.log("Home screen...")
    return(
        <>
            {/* <AppHeader/> */}
            <Content/>
            <Button   
                onPress={()=> navigation.navigate('About')}
            >
                Go to about
            </Button>
            {/* <Footer/> */}
        </>
    )
}