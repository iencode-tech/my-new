import { put, takeLatest } from "redux-saga/effects";
import { failed, readData, success } from "../../../redux/Page/Purchase";
import { makeRequest } from "../../../../utils/requestHelper";
import { purchaseRead } from "../../../../utils/apiConstants";
import { setToastData } from "../../../redux/Function/Toast";

function* triggerApi(action) {
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${purchaseRead.replace(
      "_ID_",
      action.payload.id
    )}`
  );

  if (json.status === "success") {
    yield put({ type: success().type, payload: json });
  } else {
    yield put({ type: failed().type, payload: json });
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest(readData().type, triggerApi);
}