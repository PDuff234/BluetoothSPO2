/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import {Provider, useDispatch} from 'react-redux';
import {bluetoothPeripheralsFound} from './modules/Bluetooth/bluetooth.reducer';
import {store} from './store/store';

const manager = new BleManager()

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const Home = () => {
  const dispatch = useDispatch();

  const scanForPeripherals = () => {
    
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
        console.log(scannedDevice)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello world</Text>
      <Button
        title="Press Here"
        onPress={() => {
          dispatch(bluetoothPeripheralsFound(['AA:DD:CC:DD']));
          scanForPeripherals()
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
