import { all, put, takeLatest } from "redux-saga/effects";
import {
  failedList as failedListWorkPlan,
  fetchList as fetchListWorkPlan,
  successList as successListWorkPlan,
} from "../../../redux/Page/WorkPlan";
import {
  failedList as failedListWorkCertificate,
  fetchList as fetchListWorkCertificate,
  successList as successListWorkCertificate,
} from "../../../redux/Page/WorkCertificate";
import { makeRequest } from "../../../../utils/requestHelper";
import { workPlanList } from "../../../../utils/apiConstants";
import { setToastData } from "../../../redux/Function/Toast";

function* triggerApi(action) {
  let queryString = "";
  if (action.payload) {
    queryString += "?";
    for (const property in JSON.parse(JSON.stringify(action.payload))) {
      queryString += `${property}=${action.payload[property]}&`;
    }
    queryString = queryString.slice(0, -1);
  }
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${workPlanList}${queryString}`
  );

  if (json.status === "success") {
    yield all([
      put({ type: successListWorkPlan().type, payload: json }),
      put({ type: successListWorkCertificate().type, payload: json }),
    ]);
  } else {
    yield all([
      put({ type: failedListWorkPlan().type, payload: json }),
      put({ type: failedListWorkCertificate().type, payload: json }),
    ]);
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest(
    [fetchListWorkPlan().type, fetchListWorkCertificate().type],
    triggerApi
  );
}
