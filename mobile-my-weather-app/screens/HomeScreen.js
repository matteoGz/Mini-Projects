import { Button } from "native-base";

export default function HomeScreen({ navigation }){
    console.log("Home screen...")
    return(
        <>
            Homescreen
            <Button
                bg={"violet.500"}
                color={"white"}
                onPress={()=> navigation.navigate('About info')}
            >
                Go to about
            </Button>
        </>
    )
}