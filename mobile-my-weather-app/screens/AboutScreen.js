import AppHeader from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { LogoGithubIcon } from "@primer/octicons-react";
import { Button } from "native-base";

export default function AboutScreen({ navigation }){
    console.log("About screen...")
    return(
        <>
            {/* <AppHeader/> */}
            <LogoGithubIcon/>
            <Button
                onPress={() => navigation.navigate('Home')}
            >   
                Back to home
            </Button>
            {/* <Footer/> */}
        </>
    )
}