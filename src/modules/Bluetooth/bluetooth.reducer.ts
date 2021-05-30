import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Device} from 'react-native-ble-plx';
import {BluetoothPeripheral} from '../../models/BluetoothPeripheral';

type BluetoothState = {
  availableDevices: Array<BluetoothPeripheral>;
  isConnectingToDevice: boolean;
  connectedDevice: string | null;
};

const initialState: BluetoothState = {
  availableDevices: [],
  isConnectingToDevice: false,
  connectedDevice: null,
};

const bluetoothReducer = createSlice({
  name: 'bluetooth',
  initialState: initialState,
  reducers: {
    scanForPeripherals: state => {
      state = state;
    },
    initiateConnection: (state, _) => {
      state.isConnectingToDevice = true;
    },
    connectPeripheral: (state, action) => {
      state.isConnectingToDevice = false;
      state.connectedDevice = action.payload;
    },
    bluetoothPeripheralsFound: (
      state: BluetoothState,
      action: PayloadAction<BluetoothPeripheral>,
    ) => {
      // Ensure no duplicate devices are added
      const isDuplicate = state.availableDevices.some(
        device => device.id === action.payload.id,
      );
      const isCorsenseMonitor = action.payload?.name
        ?.toLowerCase()
        ?.includes('corsense');
      if (!isDuplicate && isCorsenseMonitor) {
        state.availableDevices = state.availableDevices.concat(action.payload);
      }
    },
  },
});

export const {
  bluetoothPeripheralsFound,
  scanForPeripherals,
  initiateConnection,
} = bluetoothReducer.actions;

export const sagaActionConstants = {
  SCAN_FOR_PERIPHERALS: bluetoothReducer.actions.scanForPeripherals.type,
  ON_DEVICE_DISCOVERED: bluetoothReducer.actions.bluetoothPeripheralsFound.type,
  INITIATE_CONNECTION: bluetoothReducer.actions.initiateConnection.type,
  CONNECTION_SUCCESS: bluetoothReducer.actions.connectPeripheral.type,
};

export default bluetoothReducer;
