import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export async function navigate(name:string, params:object) {
    await navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(name, params));
    }
}

export async function  resetAndNavigation(name:string) {
    await navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset({index:0, routes:[{name:name}]}));
    }
}
