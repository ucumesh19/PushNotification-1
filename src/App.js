import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

import messaging from '@react-native-firebase/messaging';

const App = () => {

  useEffect(() => {
    requestUserPermission();

    //foreground handler, when the app is open and in view
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])

  //Firebase Push Notification
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken()
      console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  }

  return (
    <View>
      <Text>This is a tribute to Firebase Checking Purpose Push Notification</Text>
    </View>
  );

}

export default App;