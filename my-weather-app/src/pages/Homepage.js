import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";

export default function Homepage(props) {
    console.log("homepage props", props.position)
    return(
        <>
        <Header/>
        <Home/>
        <Footer/>
        </>
    );
};