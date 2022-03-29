import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faRedo,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./List.scss";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import Table from "../../../components/common/table/Table";
import {
  initFormData,
  deleteData,
  fetchList,
  handleListFormDataChange,
  selectRawMaterial,
} from "../../../store/redux/Page/RawMaterial";
import { Link } from "react-router-dom";
import { utcToLocalTime } from "../../../utils/timeHelper";
import { statuses, unitMetric } from "../../../utils/appConstants";
import Pagination from "../../../components/common/pagination/Pagination";

function RawMaterialList() {
  const store = useSelector(selectRawMaterial);
  const dispatch = useDispatch();
  const pageName = "Raw Materials";
  const routeStart = "/raw-material";
  const breadCrumbs = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Raw Materials",
      link: "",
    },
  ];

  const tableHeads = [
    "Name",
    "Price",
    "Supplier",
    "Presentation",
    "Quantity Available",
    "Unit",
    "Added Date",
    "Status",
    "",
  ];

  const _handleOnChange = (e) => {
    dispatch(
      handleListFormDataChange({
        key: e.currentTarget.name,
        value: e.currentTarget.value,
      })
    );
  };

  const _handlePageChange = (page = 1) => {
    dispatch(
      handleListFormDataChange({
        key: "page",
        value: page,
      })
    );
    dispatch(fetchList({ ...store.listFormData, page }));
  };

  const _handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchList(store.listFormData));
  };

  const _deleteListData = (e, id) => {
    e.preventDefault();
    dispatch(deleteData({ id }));
    dispatch(fetchList(store.listFormData));
  };

  const _refreshListing = (e) => {
    const form = e.currentTarget.closest("form");
    const inputs = form.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      dispatch(handleListFormDataChange({ key: inputs[i].name, value: "" }));
    }
    _handleFormSubmit(e);
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_NAME} | ${pageName}`;
    dispatch(initFormData());
    dispatch(fetchList(store.listFormData));
  }, []);

  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div className="col-12 p-0 content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">
                  {pageName}&nbsp;
                  <Link
                    type="button"
                    to={`${routeStart}/create`}
                    className="btn btn-sm btn-app ms-3"
                  >
                    Add New
                  </Link>
                </h1>
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
                    <div className={"row"}>
                      <form
                        name={`${pageName}ListFilter`}
                        onSubmit={_handleFormSubmit}
                      >
                        <div className="input-group mt-3 mb-3">
                          <input
                            name="keyword"
                            type="text"
                            className="form-control"
                            value={store.listFormData.keyword}
                            placeholder="Enter keyword to search"
                            onChange={_handleOnChange}
                          />
                          <button className="btn btn-outline-app" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                          <button
                            className="btn btn-outline-app"
                            type="reset"
                            onClick={_refreshListing}
                          >
                            <FontAwesomeIcon icon={faRedo} />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="card-body p-0">
                    <Table
                      data={store.list.map((listData, index) => ({
                        name: listData.name,
                        price: listData.price,
                        supplier: listData.supplier,
                        presentation: listData.presentation,
                        quantityAvailable: listData.quantityAvailable,
                        unitMetric: unitMetric[listData.unitMetric],
                        createdAt: utcToLocalTime(listData.createdAt),
                        status: statuses[listData.status],
                        actions: (
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-app dropdown-toggle"
                              type="button"
                              id={`action-drop-${index}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Actions
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`action-drop-${index}`}
                            >
                              <li>
                                <Link
                                  className="dropdown-item"
                                  to={`${routeStart}/${listData.id}/view`}
                                >
                                  <FontAwesomeIcon icon={faEye} /> View
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item"
                                  to={`${routeStart}/${listData.id}/edit`}
                                >
                                  <FontAwesomeIcon icon={faEdit} /> Edit
                                </Link>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) =>
                                    _deleteListData(e, listData.id)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        ),
                      }))}
                      header={tableHeads}
                    />
                  </div>

                  <div className="card-footer clearfix">
                    <Pagination
                      totalCount={parseInt(store.listCount)}
                      currentPage={parseInt(store.listFormData.page)}
                      onPageChange={_handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RawMaterialList;
