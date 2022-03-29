import { all, put, takeLatest } from "redux-saga/effects";
import { failedList, fetchList, successList } from "../../../redux/Page/Tree";
import { makeRequest } from "../../../../utils/requestHelper";
import { treeList } from "../../../../utils/apiConstants";
import {
  fetchAllTrees as fetchAllTreesExpertMonitor,
  setAllTrees as setAllTreesExpertMonitor,
} from "../../../redux/Page/ExpertMonitor";
import {
  fetchAllTrees as fetchAllTreesSector,
  setAllTrees as setAllTreesSector,
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
  // console.log("queryString: ", queryString)
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${treeList}${queryString}`
  );

  if (json.status === "success") {
    yield all([
      put({ type: successList().type, payload: json }),
      put({ type: setAllTreesExpertMonitor().type, payload: json }),
      put({ type: setAllTreesSector().type, payload: json }),
    ]);
    yield put({
      type: setToastData().type,
      payload: { type: "success", message: json.message },
    });
  } else {
    yield all([
      put({ type: failedList().type, payload: json }),
      put({ type: setAllTreesExpertMonitor().type, payload: json }),
      put({ type: setAllTreesSector().type, payload: json }),
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
      fetchAllTreesExpertMonitor().type,
      fetchAllTreesSector().type,
    ],
    triggerApi
  );
}
