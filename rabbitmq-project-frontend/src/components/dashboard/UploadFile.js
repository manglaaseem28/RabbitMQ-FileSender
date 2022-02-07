// import React from "react";
// import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";

// function UploadFile() {
//   return (
// <div>
//   <Card>
//     <CardBody>
//       <h2 className="text-center mb-4">UploadFile</h2>
//       <Form className="File-Upload-Form mb-3">
//         <FormGroup>
//           <Label htmlFor="file-upload" className="form-label">
//             File Upload
//           </Label>
//           <Input
//             name="fileToUpload"
//             id="fileToUpload"
//             required
//             type="file"
//           />
//         </FormGroup>
//         <button type="submit" className="w-100 c-blue btn btn-secondary">
//           Upload
//         </button>
//       </Form>
//     </CardBody>
//   </Card>
// </div>
//   );
// }

// export default UploadFile;

import React from "react";
import axios, { post } from "axios";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.fileUpload = this.fileUpload.bind(this);
  }
  // onFormSubmit(e) {
  //   e.preventDefault(); // Stop form submit
  //   this.fileUpload(this.state.file).then((response) => {
  //     console.log(response.data);
  //   });
  // }
  onChange(e) {
    console.log(e.target.files[0]);
    this.setState({ file: e.target.files[0], loaded: 0 });
  }

  onClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    console.log(data, this.state.file)
    axios
      .post("http://localhost:36/sendfile?file", data, {})
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // fileUpload(file) {
  //   const url = "http://localhost:8000/upload";
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   return axios.post(url, formData, config);
  // }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            {/* <h2 className="text-center mb-4">UploadFile</h2> */}
            <Form
              className="File-Upload-Form mb-3"
              onSubmit={this.onFormSubmit}
            >
              <FormGroup>
                <Label htmlFor="file-upload" className="form-label">
                  File Upload
                </Label>
                <Input
                  name="fileToUpload"
                  id="fileToUpload"
                  required
                  type="file"
                  accept="application/csv, text/csv"
                  onChange={this.onChange}
                />
              </FormGroup>
              <button
                type="submit"
                onClick={this.onClick}
                className="w-100 c-blue btn btn-secondary"
              >
                Upload
              </button>
            </Form>
          </CardBody>
        </Card>
      </div>
      //   <form onSubmit={this.onFormSubmit}>
      //     <h1>File Upload</h1>
      //     <input type="file" onChange={this.onChange} />
      //     <button type="submit">Upload</button>
      //   </form>
    );
  }
}

export default UploadFile;
