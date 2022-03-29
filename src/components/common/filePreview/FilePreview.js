import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  faFileExcel,
  faFilePdf,
  faFileImage,
  faFile,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Document, Page, pdfjs } from "react-pdf";
import "./FilePreview.scss";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function FilePreview(props) {
  const [fileUrl, setFileUrl] = useState("");

  const [paginationOpacity, setPaginationOpacity] = useState({ opacity: "0" });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const OnDelete = (e, index) => {
    e.preventDefault();
    const allFiles = [...props.files];
    allFiles.splice(index, 1);
    props._onChange({
      currentTarget: { name: "files", value: allFiles },
    });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const _selectIconBasedOnFileType = (fileName) => {
    let selectIcon;
    switch (true) {
      case fileName.match(/\.(jpeg|jpg|gif|png)$/) != null:
        selectIcon = faFileImage;
        break;

      case fileName.match(/\.(pdf)$/) != null:
        selectIcon = faFilePdf;
        break;

      case fileName.match(/\.(xlsx|xls|csv)$/) != null:
        selectIcon = faFileExcel;
        break;

      default:
        selectIcon = faFile;
        break;
    }

    return (
      <FontAwesomeIcon
        className="img-fluid"
        size="5x"
        icon={selectIcon}
        data-bs-toggle="modal"
        data-bs-target="#filePreviewModal"
        onClick={() => setFileUrl(`${props.fileUrl}/${fileName}`)}
      />
    );
  };

  const _selectPreviewerBasedOnFileType = () => {
    let selectPreviewer;
    switch (true) {
      case fileUrl.match(/\.(jpeg|jpg|gif|png)$/) != null:
        selectPreviewer = <img src={`${fileUrl}`} alt="Uploaded Data" />;
        break;

      case fileUrl.match(/\.(pdf)$/) != null:
        selectPreviewer = (
          <div
            onMouseEnter={() => setPaginationOpacity({ opacity: "100" })}
            onMouseLeave={() => setPaginationOpacity({ opacity: "0" })}
          >
            <Document file={`${fileUrl}`} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <nav
              className="shadow pdf-pagination-nav"
              aria-label="Pdf page navigation"
              style={paginationOpacity}
            >
              <ul className="pagination m-0">
                <li
                  className={`page-item ${pageNumber <= 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <p className="page-link m-0">
                    Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                    {numPages || "--"}
                  </p>
                </li>
                <li
                  className={`page-item ${
                    pageNumber >= numPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        );
        break;

      case fileUrl.match(/\.(xlsx|xls|csv)$/) != null:
        selectPreviewer = (
          <a href={`${fileUrl}`} target="_blank" rel="noreferrer" download>
            Download
          </a>
        );
        break;

      default:
        selectPreviewer = (
          <a href={`${fileUrl}`} target="_blank" rel="noreferrer" download>
            Download
          </a>
        );
        break;
    }

    return selectPreviewer;
  };

  return (
    <>
      {props.files && props.files.length > 0 && (
        <div className="row mb-3">
          <div className="col-12">
            <div className="file-preview">
              <div className="row pt-2">
                {props.files.map((file, index) => (
                  <div className="col-1 position-relative" key={index}>
                    {props.forForm && (
                      <>
                        <button
                          className="btn btn-danger position-absolute top-0 start-100 translate-middle badge rounded-circle p-0 border border-danger"
                          type="button"
                          onClick={(e) => OnDelete(e, index)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                        <input
                          key={index}
                          type="hidden"
                          name="existingFiles"
                          value={file}
                        />
                      </>
                    )}
                    {_selectIconBasedOnFileType(file)}
                  </div>
                ))}

                {/*Modal*/}
                <div
                  className="modal fade"
                  id="filePreviewModal"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="filePreviewModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="filePreviewModalLabel">
                          File Preview
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => setFileUrl("")}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="container-fluid">
                          <div className="row d-flex">
                            <div className="col-12 d-flex justify-content-center">
                              {_selectPreviewerBasedOnFileType(fileUrl)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => setFileUrl("")}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

FilePreview.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  forForm: PropTypes.bool.isRequired,
  _onChange: PropTypes.func,
};

FilePreview.defaultProps = {
  fileUrl: "",
  files: [],
  forForm: false,
};

export default FilePreview;
