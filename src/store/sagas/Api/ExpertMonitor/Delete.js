import { put, takeLatest } from "redux-saga/effects";
import { failed, deleteData, success } from "../../../redux/Page/ExpertMonitor";
import { makeRequest } from "../../../../utils/requestHelper";
import { expertMonitorDelete } from "../../../../utils/apiConstants";
import { setToastData } from "../../../redux/Function/Toast";

function* triggerApi(action) {
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${expertMonitorDelete.replace(
      "_ID_",
      action.payload.id
    )}`,
    "DELETE"
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
  yield takeLatest(deleteData().type, triggerApi);
}
