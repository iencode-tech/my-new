import { all, put, takeLatest } from "redux-saga/effects";
import { failedList, fetchList, successList } from "../../../redux/Page/Zone";
import {
  fetchAllZones as fetchAllZonesForTree,
  setAllZones as setAllZonesForTree,
} from "../../../redux/Page/Tree";
import {
  fetchAllZones as fetchAllZonesForWorkPlan,
  setAllZones as setAllZonesForWorkPlan,
} from "../../../redux/Page/WorkPlan";
import {
  fetchAllZones as fetchAllZonesForWorkCertificate,
  setAllZones as setAllZonesForWorkCertificate,
} from "../../../redux/Page/WorkCertificate";
import { makeRequest } from "../../../../utils/requestHelper";
import { zoneList } from "../../../../utils/apiConstants";
import { setToastData } from "../../../redux/Function/Toast";

function* triggerApi(action) {
  let queryString = "";
  if (action.payload) {
    queryString += "?";
    for (const property in action.payload) {
      queryString += `${property}=${action.payload[property]}&`;
    }
    queryString = queryString.slice(0, -1);
  }
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${zoneList}${queryString}`
  );

  if (json.status === "success") {
    yield all([
      put({ type: successList().type, payload: json }),
      put({ type: setAllZonesForTree().type, payload: json }),
      put({ type: setAllZonesForWorkPlan().type, payload: json }),
      put({ type: setAllZonesForWorkCertificate().type, payload: json }),
    ]);
  } else {
    yield all([
      put({ type: failedList().type, payload: json }),
      put({ type: setAllZonesForTree().type, payload: { data: [] } }),
      put({ type: setAllZonesForWorkPlan().type, payload: json }),
      put({ type: setAllZonesForWorkCertificate().type, payload: json }),
    ]);
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest(
    [
      fetchList().type,
      fetchAllZonesForTree().type,
      fetchAllZonesForWorkPlan().type,
      fetchAllZonesForWorkCertificate().type,
    ],
    triggerApi
  );
}
