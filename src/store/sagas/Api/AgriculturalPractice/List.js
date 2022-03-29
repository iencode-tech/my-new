import { all, put, takeLatest } from "redux-saga/effects";
import {
  failedList,
  fetchList,
  successList,
} from "../../../redux/Page/AgriculturalPractice";
import { makeRequest } from "../../../../utils/requestHelper";
import { agriculturalPracticeList } from "../../../../utils/apiConstants";
import {
  fetchAllAgriculturalPractices,
  setAllAgriculturalPractices,
} from "../../../redux/Page/WorkPlan";
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
    `${process.env.REACT_APP_API_URL}${agriculturalPracticeList}${queryString}`
  );

  if (json.status === "success") {
    yield all([
      put({ type: successList().type, payload: json }),
      put({ type: setAllAgriculturalPractices().type, payload: json }),
    ]);
  } else {
    yield all([
      put({
        type: setToastData().type,
        payload: { type: "error", message: json.message },
      }),
      put({ type: failedList().type, payload: json }),
      put({ type: setAllAgriculturalPractices().type, payload: json }),
    ]);
  }
}

export default function* actionWatcher() {
  yield takeLatest(
    [fetchList().type, fetchAllAgriculturalPractices().type],
    triggerApi
  );
}
