import { all, put, takeLatest } from "redux-saga/effects";
import {
  failed as failedWorkPlan,
  readData as readDataWorkPlan,
  success as successWorkPlan,
} from "../../../redux/Page/WorkPlan";
import {
  failed as failedWorkCertificate,
  readData as readDataWorkCertificate,
  success as successWorkCertificate,
} from "../../../redux/Page/WorkCertificate";
import { makeRequest } from "../../../../utils/requestHelper";
import { workPlanRead } from "../../../../utils/apiConstants";
import { setToastData } from "../../../redux/Function/Toast";

function* triggerApi(action) {
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${workPlanRead.replace(
      "_ID_",
      action.payload.id
    )}`
  );

  if (json.status === "success") {
    yield all([
      put({ type: successWorkPlan().type, payload: json }),
      put({ type: successWorkCertificate().type, payload: json }),
    ]);
  } else {
    yield all([
      put({ type: failedWorkPlan().type, payload: json }),
      put({ type: failedWorkCertificate().type, payload: json }),
    ]);
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest(
    [readDataWorkPlan().type, readDataWorkCertificate().type],
    triggerApi
  );
}
