import {eventChannel, TakeableChannel} from 'redux-saga';
import {call, put, take, takeEvery} from 'redux-saga/effects';
import {createEventChannel} from '../../util/saga.helpers';
import {sagaActionConstants} from './bluetooth.reducer';
import bluetoothLeManager from './BluetoothLeManager';

function* watchForPeripherals() {
  const onDiscoveredPeripheral = () =>
    eventChannel(emitter => {
      return bluetoothLeManager.scanForPeripherals(emitter);
    });

  const channel: TakeableChannel<unknown> = yield call(onDiscoveredPeripheral);

  try {
    while (true) {
      const response = yield take(channel);

      yield put({
        type: sagaActionConstants.ON_DEVICE_DISCOVERED,
        payload: {
          id: response.payload.id,
          name: response.payload.name,
          serviceUUIDs: response.payload.serviceUUIDs,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export function* bluetoothSaga() {
  yield takeEvery(
    sagaActionConstants.SCAN_FOR_PERIPHERALS,
    watchForPeripherals,
  );
}
