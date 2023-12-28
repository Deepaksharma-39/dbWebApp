import "./App.css";
import { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  Button,
  Col,
  FormGroup,
  FormText,
  Input,
  Row,
  Table,
} from "reactstrap";
import { read, utils } from "xlsx";

const requiredFields = ["Phone Number", "Name"];

function App() {
  const [loading, setLoading] = useState(false);
  const [excelRows, setExcelRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [heading, setHeading] = useState(false);
  const [tableHeading,setTableHeading]=useState([]);


  const fetchData = async () => {
    try {
      setLoading(true);
      const result = (await axios.get("http://localhost:5000/excel/read")).data;
      setHeading(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [heading]);



  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const result = utils.sheet_to_json(worksheet);
        console.log("result", result);
        if (result.length > 0) {
          const keys = Object.keys(result[0]);
          setTableHeading(keys);
        }
        console.log("heading", tableHeading)
        setRows(result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const renderDataTable = () => {
    if (rows.length > 0) {
      return (
        <Table>
          <thead>
            <tr>
              {tableHeading.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, id) => (
              <tr key={id}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      return <p>No data available.</p>;
    }
  };
  

 
  return (
    <Fragment>
      <h3 className="text-center mt-4 mb-4">This is</h3>
      <div className="container">
        <Row>
          <Col md="6 text-left">
            <FormGroup>
              <Input
                id="inputEmpGroupFile"
                name="file"
                type="file"
                onChange={readUploadFile}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              <FormText>
                {"Note: Must Headers in excelsheet-  "}
                {requiredFields.join(", ")}
              </FormText>
            </FormGroup>
          </Col>
          <Col md="6 text-left">
            {selectedFile?.name && (
              <Button disabled={loading} color="danger" >
                {"upload Data"}
              </Button>
            )}{" "}
            {selectedFile?.name && (
              <Button disabled={loading} color="danger" >
                {"Remove file"}
              </Button>
            )}
          </Col>
        </Row>
        {loading && <progress style={{ width: "100%" }}></progress>}
        <h4 className="mt-4" style={{ color: "lightgrey" }}>
          Data Table
        </h4>
        <Button onClick={fetchData}>Show Data</Button>
        {renderDataTable()}
      </div>
    </Fragment>
  );
}

export default App;
