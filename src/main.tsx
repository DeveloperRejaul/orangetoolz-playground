import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { decrement, increment, useAppDispatch, useAppSelector } from './redux';
import { client } from '../App';
import { gql, useQuery } from '@apollo/client';
import { navigate } from './utils';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';



export default function Main() {
  const { value } = useAppSelector(s => s.counter);
  const dispath = useAppDispatch();


  // grafql fetch data
  useEffect(() => {
    // client.query({
    //   query: gql`
    //   query GetLocations {
    //     locations {
    //       id
    //       name
    //       description
    //       photo
    //     }
    //   }
    // `,
    // })
    //   .then((result) => {
    //     console.log(result);
    //   });


    // push message setup
    const init = async () => {
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const token = await messaging().getToken();
      console.log(token);

      messaging().onMessage(onMessageReceived);
      messaging().setBackgroundMessageHandler(onMessageReceived);
      // Save the token
      // await postToApi('/users/1234/tokens', { token });
      // Do something

      // handle twilo voice call
      // getAccessToken should fetch an AccessToken from your backend
      // const twiloToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS3h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4LTE0NTA0NzExNDciLCJpc3MiOiJTS3h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4Iiwic3ViIjoiQUN4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCIsIm5iZiI6MTQ1MDQ3MTE0NywiZXhwIjoxNDUwNDc0NzQ3LCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaXBfbWVzc2FnaW5nIjp7InNlcnZpY2Vfc2lkIjoiSVN4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCIsImVuZHBvaW50X2lkIjoiSGlwRmxvd1NsYWNrRG9ja1JDOnVzZXJAZXhhbXBsZS5jb206c29tZWlvc2RldmljZSJ9fX0.IHx8KeH1acIfwnd8EIin3QBGPbfnF-yVnSFp5NpQJi0';
      // const voice = new Voice();

      // Allow incoming calls
      // await voice.register(twiloToken);

    };
    init();

  }, []);



  // alternative fetch
  // const GET_LOCATIONS = gql`
//   query GetLocations {
//     locations {
//       id
//       name
//       description
//       photo
//     }
//   }
// `;


//   const { loading, error, data } = useQuery(GET_LOCATIONS);
//   console.log(data);

  // handle Notification
  async function onDisplayNotification() {
    try {
      // Request permissions (required for iOS)
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon',
          pressAction: {
            id: 'default',
          },
        },
      });
      await notifee.setBadgeCount(20);
    } catch (error) {
      console.log(error);
    }

  }

  async function onMessageReceived(message:any) {
    onDisplayNotification();
  }




  return (
    <View>
      <Text>{value}</Text>
      <Text onPress={() => { dispath({ type: 'counter/increment', payload: 'hello' }); }}>increment</Text>
      <Text onPress={() => { dispath(decrement({})); }}>decrement</Text>

      <Text onPress={() => { dispath({ type: 'user/getUser', payload: 'fetch data' }); }}>get api data</Text>
      <Text onPress={() => {
        navigate('Details', {});
      }}>Navigate</Text>
      <Button title="Display Notification" onPress={() => { onDisplayNotification(); }} />
    </View>
  );
}

const styles = StyleSheet.create({});
