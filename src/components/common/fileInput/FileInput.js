import React from "react";
import PropTypes from "prop-types";
import FilePreview from "../filePreview/FilePreview";
import "./FileInput.scss";
import InputLabel from "../inputLabel/InputLabel";

function FileInput(props) {
  return (
    <>
      <FilePreview
        files={props.existingFiles}
        fileUrl={props.fileUrl}
        forForm={true}
        _onChange={props._onChange}
      />

      <div className="row mb-3">
        <div className="col-12">
          <InputLabel
            inputId={props.id}
            labelText={props.label}
            isRequired={props.isRequired}
          />
          <input
            id={props.id}
            className="form-control form-control-lg"
            type="file"
            name={props.name}
            accept={props.accept}
            multiple={props.isMultiple}
            required={props.isRequired}
          />
        </div>
      </div>
    </>
  );
}

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  isRequired: PropTypes.bool,
  isMultiple: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  existingFiles: PropTypes.array,
  fileUrl: PropTypes.string.isRequired,
  _onChange: PropTypes.func.isRequired,
};

FileInput.defaultProps = {
  name: "files",
  isMultiple: false,
  isRequired: false,
  label: "Files",
  existingFiles: [],
  fileUrl: "",
};

export default FileInput;
