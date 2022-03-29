import React from "react";
import PropTypes from "prop-types";
import "./Table.scss";

function Table({ header, data }) {
  return (
    <div className="table-responsive">
      <table className="table m-0">
        <thead>
          <tr>
            <th className="text-center">#</th>
            {header.length > 0
              ? header.map((element, i) => <th className="text-center" key={i}>{element}</th>)
              : ""}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={1 + header.length} className="text-center">
                No Record found
              </td>
            </tr>
          ) : (
            data.map((element, i) => (
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                {Object.keys(element).map((subElement, subI) => (
                  <td className="text-center" key={subI}>{element[subElement]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
