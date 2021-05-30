import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Device} from 'react-native-ble-plx';
import {BluetoothPeripheral} from '../../models/BluetoothPeripheral';

type BluetoothState = {
  availableDevices: Array<BluetoothPeripheral>;
};

const initialState: BluetoothState = {
  availableDevices: [],
};

const bluetoothReducer = createSlice({
  name: 'bluetooth',
  initialState: initialState,
  reducers: {
    scanForPeripherals: state => {
      state = state;
    },
    bluetoothPeripheralsFound: (
      state: BluetoothState,
      action: PayloadAction<BluetoothPeripheral>,
    ) => {
      // Ensure no duplicate devices are added
      const isDuplicate = state.availableDevices.some(
        device => device.id === action.payload.id,
      );
      if (!isDuplicate) {
        state.availableDevices = state.availableDevices.concat(action.payload);
      }
    },
  },
});

export const {bluetoothPeripheralsFound, scanForPeripherals} =
  bluetoothReducer.actions;

export const sagaActionConstants = {
  SCAN_FOR_PERIPHERALS: bluetoothReducer.actions.scanForPeripherals.type,
  ON_DEVICE_DISCOVERED: bluetoothReducer.actions.bluetoothPeripheralsFound.type,
};

export default bluetoothReducer;
