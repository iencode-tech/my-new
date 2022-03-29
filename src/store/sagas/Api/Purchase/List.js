import { all, put, takeLatest } from "redux-saga/effects";
import {
  failedList,
  fetchList,
  successList,
} from "../../../redux/Page/Purchase";
import { makeRequest } from "../../../../utils/requestHelper";
import { purchaseList } from "../../../../utils/apiConstants";
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
    `${process.env.REACT_APP_API_URL}${purchaseList}${queryString}`
  );

  if (json.status === "success") {
    yield all([put({ type: successList().type, payload: json })]);
  } else {
    yield all([put({ type: failedList().type, payload: json })]);
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest([fetchList().type], triggerApi);
}
