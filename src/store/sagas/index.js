import { all } from "redux-saga/effects";

import loginActionWatcher from "./Api/Login";
import identityActionWatcher from "./Api/Identity";
import changePasswordActionWatcher from "./Api/Profile/ChangePassword";
import updateProfileActionWatcher from "./Api/Profile/UpdateProfile";
import dashboardActionWatcher from "./Api/DashboardData";

import personListActionWatcher from "./Api/Person/List";
import personCreateActionWatcher from "./Api/Person/Create";
import personReadActionWatcher from "./Api/Person/Read";
import personUpdateActionWatcher from "./Api/Person/Update";
import personDeleteActionWatcher from "./Api/Person/Delete";

import treeListActionWatcher from "./Api/Tree/List";
import treeCreateActionWatcher from "./Api/Tree/Create";
import treeReadActionWatcher from "./Api/Tree/Read";
import treeUpdateActionWatcher from "./Api/Tree/Update";
import treeDeleteActionWatcher from "./Api/Tree/Delete";

import zoneListActionWatcher from "./Api/Zone/List";
import zoneCreateActionWatcher from "./Api/Zone/Create";
import zoneReadActionWatcher from "./Api/Zone/Read";
import zoneUpdateActionWatcher from "./Api/Zone/Update";
import zoneDeleteActionWatcher from "./Api/Zone/Delete";

import sectorListActionWatcher from "./Api/Sector/List";
import sectorCreateActionWatcher from "./Api/Sector/Create";
import sectorReadActionWatcher from "./Api/Sector/Read";
import sectorUpdateActionWatcher from "./Api/Sector/Update";
import sectorDeleteActionWatcher from "./Api/Sector/Delete";

import illnessListActionWatcher from "./Api/Illness/List";
import illnessCreateActionWatcher from "./Api/Illness/Create";
import illnessReadActionWatcher from "./Api/Illness/Read";
import illnessUpdateActionWatcher from "./Api/Illness/Update";
import illnessDeleteActionWatcher from "./Api/Illness/Delete";

import rawMaterialListActionWatcher from "./Api/RawMaterial/List";
import rawMaterialCreateActionWatcher from "./Api/RawMaterial/Create";
import rawMaterialReadActionWatcher from "./Api/RawMaterial/Read";
import rawMaterialUpdateActionWatcher from "./Api/RawMaterial/Update";
import rawMaterialDeleteActionWatcher from "./Api/RawMaterial/Delete";

import agriculturalPracticeListActionWatcher from "./Api/AgriculturalPractice/List";
import agriculturalPracticeCreateActionWatcher from "./Api/AgriculturalPractice/Create";
import agriculturalPracticeReadActionWatcher from "./Api/AgriculturalPractice/Read";
import agriculturalPracticeUpdateActionWatcher from "./Api/AgriculturalPractice/Update";
import agriculturalPracticeDeleteActionWatcher from "./Api/AgriculturalPractice/Delete";

import workPlanListActionWatcher from "./Api/WorkPlan/List";
import workPlanCreateActionWatcher from "./Api/WorkPlan/Create";
import workPlanReadActionWatcher from "./Api/WorkPlan/Read";
import workPlanUpdateActionWatcher from "./Api/WorkPlan/Update";
import workPlanDeleteActionWatcher from "./Api/WorkPlan/Delete";

import purchaseListActionWatcher from "./Api/Purchase/List";
import purchaseCreateActionWatcher from "./Api/Purchase/Create";
import purchaseReadActionWatcher from "./Api/Purchase/Read";
import purchaseUpdateActionWatcher from "./Api/Purchase/Update";
import purchaseDeleteActionWatcher from "./Api/Purchase/Delete";

import expertMonitorListActionWatcher from "./Api/ExpertMonitor/List";
import expertMonitorCreateActionWatcher from "./Api/ExpertMonitor/Create";
import expertMonitorReadActionWatcher from "./Api/ExpertMonitor/Read";
import expertMonitorUpdateActionWatcher from "./Api/ExpertMonitor/Update";
import expertMonitorDeleteActionWatcher from "./Api/ExpertMonitor/Delete";

import toastActionWatcher from "./Function/Toast";

export default function* rootSaga() {
  yield all([
    loginActionWatcher(),

    identityActionWatcher(),
    changePasswordActionWatcher(),
    updateProfileActionWatcher(),

    dashboardActionWatcher(),

    personListActionWatcher(),
    personCreateActionWatcher(),
    personReadActionWatcher(),
    personUpdateActionWatcher(),
    personDeleteActionWatcher(),

    treeListActionWatcher(),
    treeCreateActionWatcher(),
    treeReadActionWatcher(),
    treeUpdateActionWatcher(),
    treeDeleteActionWatcher(),

    zoneListActionWatcher(),
    zoneCreateActionWatcher(),
    zoneReadActionWatcher(),
    zoneUpdateActionWatcher(),
    zoneDeleteActionWatcher(),

    sectorListActionWatcher(),
    sectorCreateActionWatcher(),
    sectorReadActionWatcher(),
    sectorUpdateActionWatcher(),
    sectorDeleteActionWatcher(),

    illnessListActionWatcher(),
    illnessCreateActionWatcher(),
    illnessReadActionWatcher(),
    illnessUpdateActionWatcher(),
    illnessDeleteActionWatcher(),

    rawMaterialListActionWatcher(),
    rawMaterialCreateActionWatcher(),
    rawMaterialReadActionWatcher(),
    rawMaterialUpdateActionWatcher(),
    rawMaterialDeleteActionWatcher(),

    agriculturalPracticeListActionWatcher(),
    agriculturalPracticeCreateActionWatcher(),
    agriculturalPracticeReadActionWatcher(),
    agriculturalPracticeUpdateActionWatcher(),
    agriculturalPracticeDeleteActionWatcher(),

    workPlanListActionWatcher(),
    workPlanCreateActionWatcher(),
    workPlanReadActionWatcher(),
    workPlanUpdateActionWatcher(),
    workPlanDeleteActionWatcher(),

    purchaseListActionWatcher(),
    purchaseCreateActionWatcher(),
    purchaseReadActionWatcher(),
    purchaseUpdateActionWatcher(),
    purchaseDeleteActionWatcher(),

    expertMonitorListActionWatcher(),
    expertMonitorCreateActionWatcher(),
    expertMonitorReadActionWatcher(),
    expertMonitorUpdateActionWatcher(),
    expertMonitorDeleteActionWatcher(),


    toastActionWatcher()
  ]);
}
