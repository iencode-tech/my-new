import { put, takeLatest } from "redux-saga/effects";
import { failed, success, updateData } from "../../../redux/Page/Person";
import { makeRequest } from "../../../../utils/requestHelper";
import { personUpdate } from "../../../../utils/apiConstants";
import { setToastData } from "../../../redux/Function/Toast";

function* triggerApi(action) {
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${personUpdate.replace(
      "_ID_",
      action.payload.id
    )}`,
    "PUT",
    action.payload
  );

  if (json.status === "success") {
    yield put({ type: success().type, payload: json });
    yield put({
      type: setToastData().type,
      payload: { type: "success", message: json.message },
    });
  } else {
    yield put({ type: failed().type, payload: json });
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest(updateData().type, triggerApi);
}
