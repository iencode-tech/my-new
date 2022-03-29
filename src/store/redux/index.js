import { combineReducers } from "@reduxjs/toolkit";

import toast from "./Function/Toast";
import login from "./Page/Login";
import identity, { flush } from "./Identity";
import profile from "./Page/Profile";
import dashboard from "./Page/Dashboard";
import person from "./Page/Person";
import tree from "./Page/Tree";
import zone from "./Page/Zone";
import sector from "./Page/Sector";
import illness from "./Page/Illness";
import rawMaterial from "./Page/RawMaterial";
import agriculturalPractice from "./Page/AgriculturalPractice";
import workPlan from "./Page/WorkPlan";
import purchase from "./Page/Purchase";
import expertMonitor from "./Page/ExpertMonitor";
import workCertificate from "./Page/WorkCertificate";

const allReducers = combineReducers({
  toast,
  login,
  identity,
  profile,
  dashboard,
  person,
  tree,
  zone,
  sector,
  illness,
  rawMaterial,
  agriculturalPractice,
  workPlan,
  purchase,
  expertMonitor,
  workCertificate,
});

const rootReducers = (state, action) => {
  if (action.type === flush().type) {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducers;
