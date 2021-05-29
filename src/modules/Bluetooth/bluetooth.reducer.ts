import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    bluetoothPeripheralsFound: (
      state: BluetoothState,
      action: PayloadAction<Array<BluetoothPeripheral>>,
    ) => {
      state.availableDevices = action.payload;
    },
  },
});

export const {
    bluetoothPeripheralsFound
} = bluetoothReducer.actions

export default bluetoothReducer
