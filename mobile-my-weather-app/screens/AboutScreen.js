import AppHeader from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { LogoGithubIcon } from "@primer/octicons-react";

export default function AboutScreen(){
    console.log("About screen...")
    return(
        <>
            <AppHeader/>
            <LogoGithubIcon/>
            <Footer/>
        </>
    )
}