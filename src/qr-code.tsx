import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import QRCode from './qr-code/index';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import * as fs from 'react-native-fs';

export default function QrcodeCom() {
 const getRef =  useRef();

 const handleDownload = ()=> {

  if(getRef.current) {

    getRef.current?.toDataURL((data)=> {
      const path =  fs.DownloadDirectoryPath + `/qrcode${Date.now()}.png`;
      fs.writeFile(path, data, 'base64').then(seccess=> {
        return CameraRoll.save(path, 'photo');
      }).then(()=> {
        ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
      }).catch(err=> {
        console.log(err);
      });
    });
  }
 };


  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <QRCode
       value={'hello World'}
       size={250}
       color="black"
       backgroundColor="white"
       getRef={getRef}
      />

      <TouchableOpacity onPress={handleDownload}>
        <Text>Download</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
