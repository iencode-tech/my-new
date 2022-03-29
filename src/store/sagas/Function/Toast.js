import { select, put, takeLatest } from "redux-saga/effects";
import {
  setToastData,
  resetToastData,
  selectToast,
} from "../../redux/Function/Toast";
import { toast } from "react-toastify";

function* triggerFunction(action) {
  const state = yield select(selectToast);
  const toastSettings = {
    ...state.toastSettings,
    onClose: () => put({ type: resetToastData().type, payload: {} }),
  };

  if (action.payload.message && action.payload.message !== "") {
    switch (state.type) {
      case "info":
        toast.info(action.payload.message, toastSettings);
        break;
      case "success":
        toast.success(action.payload.message, toastSettings);
        break;
      case "warn":
        toast.warn(action.payload.message, toastSettings);
        break;
      case "error":
        toast.error(action.payload.message, toastSettings);
        break;
      default:
        toast(action.payload.message, toastSettings);
        break;
    }
  }
}

export default function* actionWatcher() {
  yield takeLatest(setToastData().type, triggerFunction);
}
