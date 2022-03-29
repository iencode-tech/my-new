import { put, takeLatest } from "redux-saga/effects";
import {
  fetchList,
  successList,
  failedList,
} from "../../../redux/Page/Illness";
import { makeRequest } from "../../../../utils/requestHelper";
import { illnessList } from "../../../../utils/apiConstants";
import {
  fetchAllIllnesses as fetchAllIllnessesExpertMonitor,
  setAllIllnesses as setAllIllnessesExpertMonitor,
} from "../../../redux/Page/ExpertMonitor";
import {
  fetchAllIllnesses as fetchAllIllnessesSector,
  setAllIllnesses as setAllIllnessesSector,
} from "../../../redux/Page/Sector";
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
    `${process.env.REACT_APP_API_URL}${illnessList}${queryString}`
  );

  if (json.status === "success") {
    yield put({ type: successList().type, payload: json });
    yield put({ type: setAllIllnessesExpertMonitor().type, payload: json });
    yield put({ type: setAllIllnessesSector().type, payload: json });
  } else {
    yield put({ type: failedList().type, payload: json });
    yield put({ type: setAllIllnessesExpertMonitor().type, payload: json });
    yield put({ type: setAllIllnessesSector().type, payload: json });
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
      fetchAllIllnessesExpertMonitor().type,
      fetchAllIllnessesSector().type,
    ],
    triggerApi
  );
}
