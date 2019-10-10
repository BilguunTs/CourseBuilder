import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";

class DropzoneAreaExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files) {
    this.setState({
      files: files
    });
  }
  render() {
    return (
      <DropzoneArea
        showFileNames
        filesLimit={1}
        dropzoneText="Upload your lecture "
        showFileNamesInPreview
        maxFileSize={50000000}
        acceptedFiles={["video/mp4", "image/wav"]}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

export default DropzoneAreaExample;
