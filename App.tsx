import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Route } from './src/route';
import { navigationRef } from './src/utils';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer ref={navigationRef}>
        <ApolloProvider client={client}>
          <Route />
        </ApolloProvider>
      </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
