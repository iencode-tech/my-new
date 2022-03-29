import { all, put, takeLatest } from "redux-saga/effects";
import { flush, populate, sync } from "../../redux/Identity";
import { readData, success, failed } from "../../redux/Page/Profile";
import { makeRequest } from "../../../utils/requestHelper";
import { identity } from "../../../utils/apiConstants";
import { setToastData } from "../../redux/Function/Toast";

function* triggerApi(action) {
  const json = yield makeRequest(`${process.env.REACT_APP_API_URL}${identity}`);

  if (json.status === "success") {
    yield all([
      put({ type: populate().type, payload: json }),
      put({ type: success().type, payload: json }),
    ]);
    yield put({
      type: setToastData().type,
      payload: { type: "success", message: json.message },
    });
  } else {
    yield all([
      put({ type: flush().type, payload: json }),
      put({ type: failed().type, payload: json }),
    ]);
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest([sync().type, readData().type], triggerApi);
}
