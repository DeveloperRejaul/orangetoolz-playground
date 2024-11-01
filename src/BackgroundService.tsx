/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity, View, Text } from 'react-native';
import React, { useState } from 'react';
import BS from 'react-native-background-actions';

// await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
// // iOS will also run everything here in the background until .stop() is called
// await BackgroundService.stop();
export default function BackgroundService() {
  const [count, setCount] = useState(0);

  const handleStartBackgroundService = async () => {
    try {
      const sleep = (time:number) => new Promise((resolve) => setTimeout(() => resolve(null), time));
      const options = {
        taskName: 'Example',
        taskTitle: 'ExampleTask title',
        taskDesc: 'ExampleTask description',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        parameters: {
            delay: 1000,
        },
      };
      const veryIntensiveTask = async () => {
        await new Promise( async () => {
            for (let i = 0; BS.isRunning(); i++) {
                console.log(i);
                setCount(i);
                await sleep(1000);
            }
          });
      };
      await BS.start(veryIntensiveTask, options);
    } catch (error) {
      console.log(error);
    }
  };


  const backgroundServiceStop = async () => {
    await BS.stop();
  };

  return (
    <View style={{justifyContent:'center', alignItems:'center', flex:1, rowGap:10}}>
      <Text>Count : {count}</Text>
      <TouchableOpacity onPress={handleStartBackgroundService}>
        <Text
        style={{
          backgroundColor:'blue',
          paddingHorizontal:10,
          paddingVertical: 5,
          borderRadius: 10,
          fontSize: 20,
          color:'#fff',
        }}
        >Start Background Service</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={backgroundServiceStop}>
        <Text
        style={{
          backgroundColor:'blue',
          paddingHorizontal:10,
          paddingVertical: 5,
          borderRadius: 10,
          fontSize: 20,
          color:'#fff',
        }}
        >Stop Background Service</Text>
      </TouchableOpacity>
    </View>
  );
}
