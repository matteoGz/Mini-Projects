import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { navMenu } from '../models/navMenu';

export default function CustomDrawerContent(props){

    const activeDarkMode = () => {
        //to active dark mode...
        props.navigation.closeDrawer()
    }

    return(
        <DrawerContentScrollView {...props} >
            <DrawerItemList {...props} />
            <DrawerItem
                label="Dark mode"
                onPress={activeDarkMode}
                icon={() => navMenu[4].icon}
            />
        </DrawerContentScrollView>
    )
}