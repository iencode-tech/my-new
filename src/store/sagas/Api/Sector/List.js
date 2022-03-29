import { all, put, takeLatest } from "redux-saga/effects";
import { failedList, fetchList, successList } from "../../../redux/Page/Sector";
import {
  setAllSectors as setAllSectorsForTree,
  fetchAllSectors as fetchAllSectorsForTree,
} from "../../../redux/Page/Tree";
import {
  setAllSectors as setAllSectorsForWorkPlan,
  fetchAllSectors as fetchAllSectorsForWorkPlan,
} from "../../../redux/Page/WorkPlan";
import {
  setAllSectors as setAllSectorsForWorkCertificate,
  fetchAllSectors as fetchAllSectorsForWorkCertificate,
} from "../../../redux/Page/WorkCertificate";
import { makeRequest } from "../../../../utils/requestHelper";
import { sectorList } from "../../../../utils/apiConstants";
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
    `${process.env.REACT_APP_API_URL}${sectorList}${queryString}`
  );

  if (json.status === "success") {
    yield all([
      put({ type: successList().type, payload: json }),
      put({ type: setAllSectorsForTree().type, payload: json }),
      put({ type: setAllSectorsForWorkPlan().type, payload: json }),
      put({ type: setAllSectorsForWorkCertificate().type, payload: json }),
    ]);
  } else {
    yield all([
      put({ type: failedList().type, payload: json }),
      put({
        type: setAllSectorsForTree().type,
        payload: { data: { dbData: [] } },
      }),
      put({ type: setAllSectorsForWorkPlan().type, payload: { data: json } }),
      put({
        type: setAllSectorsForWorkCertificate().type,
        payload: { data: json },
      }),
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
      fetchAllSectorsForTree().type,
      fetchAllSectorsForWorkPlan().type,
      fetchAllSectorsForWorkCertificate().type,
    ],
    triggerApi
  );
}
