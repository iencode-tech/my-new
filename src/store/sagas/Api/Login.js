import { put, takeLatest } from "redux-saga/effects";
import { attempt, failed, success } from "../../redux/Page/Login";
import { populate } from "../../redux/Identity";
import { makeRequest } from "../../../utils/requestHelper";
import { login } from "../../../utils/apiConstants";
import { setToastData } from "../../redux/Function/Toast";

function* triggerApi(action) {
  const json = yield makeRequest(
    `${process.env.REACT_APP_API_URL}${login}`,
    "POST",
    action.payload
  );

  if (json.status === "success") {
    yield put({ type: success().type, payload: {} });

    const userStoreData = { ...json.data };
    delete userStoreData.access_token;
    localStorage.setItem(
      process.env.REACT_APP_AUTH_KEY_NAME,
      json.data.access_token
    );
    yield put({ type: populate().type, payload: { data: userStoreData } });
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
  yield takeLatest(attempt().type, triggerApi);
}
