/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './main';
import Details from './details';
import DraggableList from './draggablelist';
import Sqlite from './sqlite';
import BackgroundService from './BackgroundService';
import QrCodeCom from './qr-code';

const Stack = createNativeStackNavigator();


export function Route() {
    return <Stack.Navigator initialRouteName="QrCodeCom">
            <Stack.Screen name="QrCodeCom" component={QrCodeCom} />
            <Stack.Screen name="BackgroundService" component={BackgroundService} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="DraggableList" component={DraggableList} />
            <Stack.Screen name="Sqlite" component={Sqlite} />
        </Stack.Navigator>;
}
