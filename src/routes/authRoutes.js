import React, {lazy} from "react";
import { Redirect, Route } from "react-router-dom";
import { authCheck } from "../utils/authHelper";
import AuthLayout from "../layout/AuthLayout";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const ChangePassword = lazy(() => import("../pages/profile/changePassword/ChangePassword"));
const EditProfile = lazy(() => import("../pages/profile/editProfile/EditProfile"));

const ArcGis = lazy(() => import("../pages/arcGis/ArcGis"));

const PersonList = lazy(() => import("../pages/persons/list/List"));
const PersonCreate = lazy(() => import("../pages/persons/create/Create"));
const PersonEdit = lazy(() => import("../pages/persons/edit/Edit"));
const PersonView = lazy(() => import("../pages/persons/view/View"));

const TreeList = lazy(() => import("../pages/trees/list/List"));
const TreeCreate = lazy(() => import("../pages/trees/create/Create"));
const TreeEdit = lazy(() => import("../pages/trees/edit/Edit"));
const TreeView = lazy(() => import("../pages/trees/view/View"));

const ZoneList = lazy(() => import("../pages/zones/list/List"));
const ZoneCreate = lazy(() => import("../pages/zones/create/Create"));
const ZoneEdit = lazy(() => import("../pages/zones/edit/Edit"));
const ZoneView = lazy(() => import("../pages/zones/view/View"));

const SectorList = lazy(() => import("../pages/sectors/list/List"));
const SectorCreate = lazy(() => import("../pages/sectors/create/Create"));
const SectorEdit = lazy(() => import("../pages/sectors/edit/Edit"));
const SectorView = lazy(() => import("../pages/sectors/view/View"));

const IllnessList = lazy(() => import("../pages/illnesses/list/List"));
const IllnessCreate = lazy(() => import("../pages/illnesses/create/Create"));
const IllnessEdit = lazy(() => import("../pages/illnesses/edit/Edit"));
const IllnessView = lazy(() => import("../pages/illnesses/view/View"));

const RawMaterialList = lazy(() => import("../pages/rawMaterials/list/List"));
const RawMaterialCreate = lazy(() => import("../pages/rawMaterials/create/Create"));
const RawMaterialEdit = lazy(() => import("../pages/rawMaterials/edit/Edit"));
const RawMaterialView = lazy(() => import("../pages/rawMaterials/view/View"));

const AgriculturalPracticeList = lazy(() => import("../pages/agriculturalPractices/list/List"));
const AgriculturalPracticeCreate = lazy(() => import("../pages/agriculturalPractices/create/Create"));
const AgriculturalPracticeEdit = lazy(() => import("../pages/agriculturalPractices/edit/Edit"));
const AgriculturalPracticeView = lazy(() => import("../pages/agriculturalPractices/view/View"));

const WorkPlanList = lazy(() => import("../pages/workPlans/list/List"));
const WorkPlanCreate = lazy(() => import("../pages/workPlans/create/Create"));
const WorkPlanEdit = lazy(() => import("../pages/workPlans/edit/Edit"));
const WorkPlanView = lazy(() => import("../pages/workPlans/view/View"));

const PurchaseList = lazy(() => import("../pages/purchases/list/List"));
const PurchaseCreate = lazy(() => import("../pages/purchases/create/Create"));
const PurchaseEdit = lazy(() => import("../pages/purchases/edit/Edit"));
const PurchaseView = lazy(() => import("../pages/purchases/view/View"));

const ExpertMonitorList = lazy(() => import("../pages/expertMonitors/list/List"));
const ExpertMonitorCreate = lazy(() => import("../pages/expertMonitors/create/Create"));
const ExpertMonitorEdit = lazy(() => import("../pages/expertMonitors/edit/Edit"));
const ExpertMonitorView = lazy(() => import("../pages/expertMonitors/view/View"));

const WorkCertificate = lazy(() => import("../pages/workCertificate"));


const PayrollList = lazy(() => import("../pages/payroll/list/PayrollList"));

const routes = [
  {
    path: "/arcgis",
    component: <ArcGis />,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/change-password",
    component: <ChangePassword />,
  },
  {
    path: "/profile/edit",
    component: <EditProfile />,
  },
  {
    path: "/persons",
    component: <PersonList />,
  },
  {
    path: "/person/create",
    component: <PersonCreate />,
  },
  {
    path: "/person/:id/edit",
    component: <PersonEdit />,
  },
  {
    path: "/person/:id/view",
    component: <PersonView />,
  },
  {
    path: "/trees",
    component: <TreeList />,
  },
  {
    path: "/tree/create",
    component: <TreeCreate />,
  },
  {
    path: "/tree/:id/edit",
    component: <TreeEdit />,
  },
  {
    path: "/tree/:id/view",
    component: <TreeView />,
  },
  {
    path: "/zones",
    component: <ZoneList />,
  },
  {
    path: "/zone/create",
    component: <ZoneCreate />,
  },
  {
    path: "/zone/:id/edit",
    component: <ZoneEdit />,
  },
  {
    path: "/zone/:id/view",
    component: <ZoneView />,
  },
  {
    path: "/sectors",
    component: <SectorList />,
  },
  {
    path: "/sector/create",
    component: <SectorCreate />,
  },
  {
    path: "/sector/:id/edit",
    component: <SectorEdit />,
  },
  {
    path: "/sector/:id/view",
    component: <SectorView />,
  },
  {
    path: "/illnesses",
    component: <IllnessList />,
  },
  {
    path: "/illness/create",
    component: <IllnessCreate />,
  },
  {
    path: "/illness/:id/edit",
    component: <IllnessEdit />,
  },
  {
    path: "/illness/:id/view",
    component: <IllnessView />,
  },
  {
    path: "/raw-materials",
    component: <RawMaterialList />,
  },
  {
    path: "/raw-material/create",
    component: <RawMaterialCreate />,
  },
  {
    path: "/raw-material/:id/edit",
    component: <RawMaterialEdit />,
  },
  {
    path: "/raw-material/:id/view",
    component: <RawMaterialView />,
  },
  {
    path: "/agricultural-practices",
    component: <AgriculturalPracticeList />,
  },
  {
    path: "/agricultural-practice/create",
    component: <AgriculturalPracticeCreate />,
  },
  {
    path: "/agricultural-practice/:id/edit",
    component: <AgriculturalPracticeEdit />,
  },
  {
    path: "/agricultural-practice/:id/view",
    component: <AgriculturalPracticeView />,
  },
  {
    path: "/work-plans",
    component: <WorkPlanList />,
  },
  {
    path: "/work-plan/create",
    component: <WorkPlanCreate />,
  },
  {
    path: "/work-plan/:id/edit",
    component: <WorkPlanEdit />,
  },
  {
    path: "/work-plan/:id/view",
    component: <WorkPlanView />,
  },
  {
    path: "/purchases",
    component: <PurchaseList />,
  },
  {
    path: "/purchase/create",
    component: <PurchaseCreate />,
  },
  {
    path: "/purchase/:id/edit",
    component: <PurchaseEdit />,
  },
  {
    path: "/purchase/:id/view",
    component: <PurchaseView />,
  },
  {
    path: "/expert-monitors",
    component: <ExpertMonitorList />,
  },
  {
    path: "/expert-monitor/create",
    component: <ExpertMonitorCreate />,
  },
  {
    path: "/expert-monitor/:id/edit",
    component: <ExpertMonitorEdit />,
  },
  {
    path: "/expert-monitor/:id/view",
    component: <ExpertMonitorView />,
  },
  {
    path: "/work-certificates",
    component: <WorkCertificate />,
  },
  {
    path: "/payroll",
    component: <PayrollList />,
  }
];

export default routes.map((route, index) => (
  <Route
    exact
    key={index}
    path={route.path}
    render={() =>
      authCheck() === false ? (
        <Redirect to="/login" />
      ) : (
        <AuthLayout>{route.component}</AuthLayout>
      )
    }
  />
));
