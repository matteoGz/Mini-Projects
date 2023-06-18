import Content from "../components/Content";
import Footer from "../components/Footer";
import AppHeader from "../components/Header";

export default function HomeScreen(){
    console.log("Home screen...")
    return(
        <>
            <AppHeader/>
            <Content/>
            <Footer/>
        </>
    )
}