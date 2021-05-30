/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {scanForPeripherals} from './modules/Bluetooth/bluetooth.reducer';
import {RootState, store} from './store/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const Home: FC = () => {
  const dispatch = useDispatch();
  const devices = useSelector(
    (state: RootState) => state.bluetooth.availableDevices,
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {devices.map(device => (
          <>
            <Text>{JSON.stringify(device)}</Text>
            <View height={20} />
          </>
        ))}
        <Button
          title="Press Here To Scan"
          onPress={() => {
            dispatch(scanForPeripherals());
          }}
        />
      </ScrollView>
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
