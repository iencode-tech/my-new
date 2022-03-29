import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./View.scss";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import {
  initFormData,
  readData,
  selectWorkPlan,
} from "../../../store/redux/Page/WorkPlan";
import WorkPlanDataView from "../../../components/pageSpecific/workPlans/view/View";
import { useParams } from "react-router-dom";

function WorkPlanView() {
  const params = useParams();
  const store = useSelector(selectWorkPlan);
  const dispatch = useDispatch();
  const pageName = "View work plan";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Work Plans",
      link: "/work-plans",
    },
    {
      name: "View",
      link: "",
    },
  ];

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
    dispatch(initFormData());
    dispatch(readData({ id: params.id }));
  }, []);

  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div className="col-12 p-0 content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">{pageName}</h1>
              </div>
              <div className="col-sm-6">
                <Breadcrumb breadCrumbs={breadCrumbs} />
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header border-transparent">
                    <div className={"row"}>&nbsp;</div>
                  </div>

                  <div className="card-body">
                    <WorkPlanDataView formData={store.formData} />
                  </div>

                  <div className="card-footer clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkPlanView;
