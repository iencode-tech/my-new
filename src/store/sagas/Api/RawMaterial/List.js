import { put, takeLatest } from "redux-saga/effects";
import {
  failedList,
  fetchList,
  successList,
} from "../../../redux/Page/RawMaterial";
import { makeRequest } from "../../../../utils/requestHelper";
import { rawMaterialList } from "../../../../utils/apiConstants";
import {
  fetchAllRawMaterials as fetchAllRawMaterialsForAgriculturalPractice,
  setAllRawMaterials as setAllRawMaterialsForAgriculturalPractice,
} from "../../../redux/Page/AgriculturalPractice";
import {
  fetchAllRawMaterials as fetchAllRawMaterialsForPurchase,
  setAllRawMaterials as setAllRawMaterialsForPurchase,
} from "../../../redux/Page/Purchase";
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
    `${process.env.REACT_APP_API_URL}${rawMaterialList}${queryString}`
  );

  if (json.status === "success") {
    yield put({ type: successList().type, payload: json });
    yield put({
      type: setAllRawMaterialsForAgriculturalPractice().type,
      payload: json,
    });
    yield put({ type: setAllRawMaterialsForPurchase().type, payload: json });
  } else {
    yield put({ type: failedList().type, payload: json });
    yield put({
      type: setAllRawMaterialsForAgriculturalPractice().type,
      payload: { data: { dbData: [] } },
    });
    yield put({
      type: setAllRawMaterialsForPurchase().type,
      payload: { data: { dbData: [] } },
    });
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
      fetchAllRawMaterialsForAgriculturalPractice().type,
      fetchAllRawMaterialsForPurchase().type,
    ],
    triggerApi
  );
}
