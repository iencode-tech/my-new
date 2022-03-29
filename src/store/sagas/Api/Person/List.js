import { all, put, takeLatest } from "redux-saga/effects";
import { fetchList, successList, failedList } from "../../../redux/Page/Person";
import { makeRequest } from "../../../../utils/requestHelper";
import { personList } from "../../../../utils/apiConstants";
import {
  fetchAllCollaborators,
  setAllCollaborators,
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
    `${process.env.REACT_APP_API_URL}${personList}${queryString}`
  );

  if (json.status === "success") {
    yield all([
      put({ type: successList().type, payload: json }),
      put({ type: setAllCollaborators().type, payload: json }),
    ]);
  } else {
    yield all([
      put({ type: failedList().type, payload: json }),
      put({ type: setAllCollaborators().type, payload: json }),
    ]);
    yield put({
      type: setToastData().type,
      payload: { type: "error", message: json.message },
    });
  }
}

export default function* actionWatcher() {
  yield takeLatest(
    [fetchList().type, fetchAllCollaborators().type],
    triggerApi
  );
}
