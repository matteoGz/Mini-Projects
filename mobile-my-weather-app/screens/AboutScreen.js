import { LogoGithubIcon } from "@primer/octicons-react";
import { Button } from "native-base";

export default function AboutScreen({ navigation }){
    console.log("About screen...")
    return(
        <>
            <LogoGithubIcon/>
            <Button
                bg={"violet.500"}
                color={"white"}
                onPress={() => navigation.navigate('Home')}
            >   
                Back to home
            </Button>
            {/* <Footer/> */}
        </>
    )
}