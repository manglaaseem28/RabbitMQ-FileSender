// import React from "react";
// import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";

// function Dashboard() {
//   return (
// <div>
//   <Card>
//     <CardBody>
//       <h2 className="text-center mb-4">Dashboard</h2>
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

// export default Dashboard;

import React from "react";
import NavDash from "./NavDash";
import ShowData from "./ShowData";
import UploadFile from "./UploadFile";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    
  }

  render() {
    return (
      <div className='dashboard'>
        <NavDash/>
        <h1 className="text-center mb-4">Dashboard</h1>
        <UploadFile/>
        <div>
          <ShowData/>
        </div>
      </div>

    );
  }
}

export default Dashboard;
