import { LogoGithubIcon } from "@primer/octicons-react";
import { Button } from "native-base";
import DrawerApp from "../components/DrawerApp";

export default function AboutScreen({ navigation }){
    console.log("About screen...")
    return(
        <>
            {/* <AppHeader/> */}
            {DrawerApp}
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