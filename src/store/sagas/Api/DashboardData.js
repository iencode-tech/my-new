import { put, takeLatest } from "redux-saga/effects";
import { attempt, failed, success } from "../../redux/Page/Dashboard";
import { makeRequest } from "../../../utils/requestHelper";
import { dashboardData } from "../../../utils/apiConstants";

function* triggerApi(action) {
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${dashboardData}`
  );

  if (json.status === "success") {
    yield put({ type: success().type, payload: json });
  } else {
    yield put({ type: failed().type, payload: json });
  }
}

export default function* actionWatcher() {
  yield takeLatest(attempt().type, triggerApi);
}
