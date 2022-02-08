import React from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { uploadFile } from "../../service/file.service";
/**
 * Component for choosing and uploading file 
 */
class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      response: {
        isLoading: true,
        fileloaded: false,
        errMsg: "",
      },
      showMsg: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    // console.log(e.target.files[0]);
    this.setState({ file: e.target.files[0], loaded: 0 });
  }

  handleSubmit = async (e) => {
    this.setState({ showMsg: true });
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    // console.log(data, this.state.file);
    await uploadFile(data)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          this.setState({
            response: { isLoading: false, fileloaded: true },
            file: null,
          });
        } else {
          this.setState({
            response: {
              isLoading: false,
              fileloaded: false,
              errMsg: result.data,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(this.state.response);
  };

  render() {
    const { response, showMsg } = this.state;
    const responseView = (
      <>
        {response.isLoading ? (
          <Spinner />
        ) : response.fileloaded ? (
          <Alert color="success">File Uploaded Successfully</Alert>
        ) : (
          <Alert color="danger">{response.errMsg}</Alert>
        )}
      </>
    );
    return (
      <div>
        <Card>
          <CardBody>
            {/* <h2 className="text-center mb-4">UploadFile</h2> */}
            <Form
              className="File-Upload-Form mb-3"
              onSubmit={this.handleSubmit}
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
              <Button
                type="submit"
                color="success"
                className="w-100 c-blue btn btn-secondary"
              >
                Upload
              </Button>
            </Form>
          </CardBody>
        </Card>
        {showMsg && <div>{responseView}</div>}
      </div>
    );
  }
}

export default UploadFile;
