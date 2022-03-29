import React, { useEffect, useState } from "react";
import "./LeftSideBar.scss";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pluralize from "pluralize";
import {
  faAtom,
  faClipboardList,
  faCog,
  faCrosshairs,
  faCube,
  faDesktop,
  faDolly,
  faFileAlt,
  faFileInvoice,
  faMapMarkerAlt,
  faPencilAlt,
  faShareAlt,
  faShoppingCart,
  faSkullCrossbones,
  faTree,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faElementor } from "@fortawesome/free-brands-svg-icons";

function LeftSideBar() {
  const location = useLocation();
  const history = useHistory();
  const [sidebarLinks, setSideBarLinks] = useState([
    {
      name: "Dashboard",
      icon: faCube,
      link: "/dashboard",
      active: false,
    },
    {
      name: "Settings",
      icon: faCog,
      link: "",
      active: false,
      children: [
        {
          name: "Person",
          icon: faUser,
          link: "/persons",
          active: false,
        },
        {
          name: "Tree",
          icon: faTree,
          link: "/trees",
          active: false,
        },
        {
          name: "Zone",
          icon: faDolly,
          link: "/zones",
          active: false,
        },
        {
          name: "Sector",
          icon: faMapMarkerAlt,
          link: "/sectors",
          active: false,
        },
        {
          name: "Illness",
          icon: faSkullCrossbones,
          link: "/illnesses",
          active: false,
        },
        {
          name: "Raw Material",
          icon: faAtom,
          link: "/raw-materials",
          active: false,
        },
      ],
    },
    {
      name: "Agricultural Practice",
      icon: faShareAlt,
      link: "/agricultural-practices",
      active: false,
    },
    {
      name: "Plan",
      icon: faClipboardList,
      link: "",
      active: false,
      children: [
        {
          name: "Work Plan",
          icon: faElementor,
          link: "/work-plans",
          active: false,
        },
      ],
    },
    {
      name: "Purchase",
      icon: faShoppingCart,
      link: "/purchases",
      active: false,
    },
    {
      name: "Expert Monitors",
      icon: faDesktop,
      link: "/expert-monitors",
      active: false,
    },
    {
      name: "Reports",
      icon: faFileAlt,
      link: "",
      active: false,
      children: [
        {
          name: "Work Certificate",
          icon: faFileInvoice,
          link: "/work-certificates",
          active: false,
        },
        {
          name: "ArcGis",
          icon: faCrosshairs,
          link: "/arcgis",
          active: false,
        },
      ],
    },
    {
      name: "PayRoll",
      icon: faDesktop,
      link: "/payroll",
      active: false,
    },
  ]);

  const sidebarUpdate = (newLocation) => {
    const sidebarLinksCopy = [...sidebarLinks];
    sidebarLinks.forEach((data, index) => {
      const parentRegex = new RegExp(
        `(/${pluralize.singular(data.link.replace("/", ""))})($|s|es|(/.*))`,
        "ig"
      );
      let parentMatched = parentRegex.test(newLocation.pathname);
      if (data.children) {
        parentMatched = false;
        data.children.forEach((subData, subIndex) => {
          const childRegex = new RegExp(
            `(/${pluralize.singular(
              subData.link.replace("/", "")
            )})($|s|es|(/.*))`,
            "ig"
          );
          const childMatched = childRegex.test(newLocation.pathname);
          sidebarLinksCopy[index].children[subIndex].active = childMatched;
          if (childMatched === true) {
            parentMatched = childMatched;
          }
        });
      }
      sidebarLinksCopy[index].active = parentMatched;
    });
    setSideBarLinks(sidebarLinksCopy);
  };

  useEffect(() => {
    sidebarUpdate(location);
    let unListen = history.listen((newLocation) => sidebarUpdate(newLocation));

    return () => {
      unListen();
    };
  }, []);

  return (
    <aside
      id="leftSideBarMenu"
      className="col-md-3 col-lg-2 d-md-block collapse bg-app sidebar"
    >
      <nav className="sidebar-sticky">
        <ul className="nav flex-column" id="accordionFlushMenu">
          {sidebarLinks.map((data, index) => (
            <li key={index} className="nav-item">
              {data.children && data.children.length > 0 ? (
                <div className="accordion accordion-flush">
                  <div className={`accordion-item`}>
                    <h2
                      className={`accordion-header`}
                      id={`leftMenu-flush-heading${index}`}
                    >
                      <button
                        className={`accordion-button bg-app nav-link ${
                          data.active === true ? "active" : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#leftMenu-flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`#leftMenu-flush-collapse${index}`}
                      >
                        <span>
                          <FontAwesomeIcon className="me-2" icon={data.icon} />
                        </span>
                        {data.name}
                      </button>
                    </h2>
                    <div
                      id={`leftMenu-flush-collapse${index}`}
                      className={`bg-app accordion-collapse collapse ${
                        data.active === true ? "show" : ""
                      }`}
                      aria-labelledby={`leftMenu-flush-heading${index}`}
                      data-bs-parent="#accordionFlushMenu"
                    >
                      <div className="accordion-body">
                        <ul className="nav flex-column">
                          {data.children.map((subData, subIndex) => (
                            <li key={subIndex} className="nav-item">
                              <NavLink
                                className={`nav-link`}
                                aria-current="page"
                                activeClassName={`active`}
                                isActive={() => subData.active}
                                to={subData.link}
                              >
                                <span>
                                  <FontAwesomeIcon
                                    className="me-2"
                                    icon={subData.icon}
                                  />
                                </span>
                                {subData.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  className={`nav-link`}
                  aria-current="page"
                  to={data.link}
                  activeClassName="active"
                  isActive={() => data.active}
                >
                  <span>
                    <FontAwesomeIcon className="me-2" icon={data.icon} />
                  </span>
                  {data.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default LeftSideBar;
