import React, { useState } from "react";
import { Button, Container, Table } from "reactstrap";
import { fetchdata } from "../../service/file.service";
import './dashboard.css'

function ShowData() {
  const [data, setdata] = useState([
    {
      task_description: "",
      task_id: 0,
      task_title: "",
    },
  ]);

  const showTable = () => {
    return (
      <Table striped hover responsive >
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task Title</th>
            <th>Task Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => {
            return (
              <tr>
                <th scope="row">{entry.task_id}</th>
                <td>{entry.task_title}</td>
                <td>{entry.task_description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
  const fetchData = async () => {
    await fetchdata()
      .then((result) => {
        console.log(result);
        setdata(result.data)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className='container-fluid'>
      <Button color="warning" onClick={fetchData}>Fetch Data</Button>
      <Container className="table-container">
        {showTable()}
      </Container>
    </div>
  );
}

export default ShowData;
