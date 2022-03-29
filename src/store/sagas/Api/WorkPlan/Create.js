import { put, takeLatest } from "redux-saga/effects";
import { failed, storeData, success } from "../../../redux/Page/WorkPlan";
import { makeRequest } from "../../../../utils/requestHelper";
import { workPlanCreate } from "../../../../utils/apiConstants";
import { setToastData } from "../../../redux/Function/Toast";

function* triggerApi(action) {
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${workPlanCreate}`,
    "POST",
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
  yield takeLatest(storeData().type, triggerApi);
}
