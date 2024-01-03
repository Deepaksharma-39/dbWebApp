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
  InputGroup,
  Row,
  Table,
} from "reactstrap";
import { read, utils } from "xlsx";

const requiredFields = ["MOBILE NO", "NAME"];

function App() {
  const [loading, setLoading] = useState(false);
  const [excelRows, setExcelRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [tableHeading, setTableHeading] = useState([]);
  const [city, setCity] = useState("");
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [phone, setPhone] = useState("");

  const findByCity = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/excel/findByCity/${city}`)
      ).data;
      setLoading(false);
      setRows(result);
      console.log(result);
    } catch (error) {
      setLoading(false);
    }
  };
  const findByName = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/excel/findByName/${name1}`)
      ).data;
      setLoading(false);
      setRows(result);
      console.log(name1);
    } catch (error) {
      setLoading(false);
    }
  };
  const findByEmail = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/excel/findByEmail/${email}`)
      ).data;
      setLoading(false);
      setRows(result);
      console.log(result);
    } catch (error) {
      setLoading(false);
    }
  };
  const findByPan = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/excel/findByPan/${pan}`)
      ).data;
      setLoading(false);
      setRows(result);

      console.log(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const findByPhone = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/excel/findByPhone/${phone}`)
      ).data;
      setLoading(false);
      setRows(result);

      console.log(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (await axios.get("http://localhost:5000/excel/read")).data;
      setLoading(false);
      if (result.length > 0) {
        const keys = Object.keys(result[0]);
        setTableHeading(keys);
      }
      setRows(result);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readUploadFile = (e) => {
    e.preventDefault();
    setLoading(true);
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
        if (result.length > 0) {
          const keys = Object.keys(result[0]);
          setTableHeading(keys);
        }
        setRows(result);
        setExcelRows(result);
        setLoading(false);
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

  const removeFile = () => {
    setSelectedFile(null);
    setExcelRows([]);
    setRows([]);
    window.location.reload();
  };

  const uploadData = async () => {
    try {
      setLoading(true);

      const firstItemKeys = excelRows[0] && Object.keys(excelRows[0]);
      let requiredValidation = false;

      if (firstItemKeys.length) {
        requiredFields.forEach((element) => {
          if (!firstItemKeys.find((x) => x === element)) {
            requiredValidation = true;
          }
        });
      }

      if (requiredValidation) {
        alert("Required fields " + JSON.stringify(requiredFields), "+ missing");
        setLoading(false);
        return;
      }

      const response = (await axios.get("http://localhost:5000/excel/read"))
        .data;
      const data = response || [];

      const result = excelRows.map((obj, index) => {
        const mappedObject = {};
        tableHeading.forEach((key) => {
          if (key === "MOBILE NO") {
            const existingRecord = data.find(
              (record) => record["MOBILE NO"] === obj[key]
            );
            console.log("existingRecord", existingRecord);
            mappedObject["_id"] = existingRecord
              ? existingRecord["_id"]
              : undefined;
            mappedObject["MOBILE NO"] = obj[key];
          } else {
            mappedObject[key] = obj[key] || "";
          }
        });

        return mappedObject;
      });

      const updatedData = result.filter((x) => x._id);
      const newData = result.filter((x) => !x._id);

      if (updatedData.length) {
        const result = await axios.post(
          "http://localhost:5000/excel/update",
          updatedData,
          { headers: { "Content-Type": "application/json" } }
        ).data;

        if (result) {
          alert("Successfully update " + updatedData.length + " documents");
        }
      }

      if (newData.length) {
        const result = (
          await axios.post("http://localhost:5000/excel/test", newData)
        ).data;

        if (result) {
          alert("successfully added " + newData.length + " documents");
        }
      }

      fetchData();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("upload Error :", err);
    }
  };

  return (
    <Fragment>
      <h3 className="text-center mt-4 mb-4">DBMS</h3>
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
              <Button disabled={loading} color="success" onClick={uploadData}>
                {"Upload Data"}
              </Button>
            )}{" "}
            {selectedFile?.name && (
              <Button disabled={loading} color="danger" onClick={removeFile}>
                {"Reset"}
              </Button>
            )}{" "}
            <Button onClick={fetchData}>Show all Data</Button>
          </Col>
        </Row>
       

        <Row className="citySearchBox">
          <Col md="3 text-left">
            <InputGroup>
              <Input
                id="inputSearchByCity"
                name="citySearch"
                type="text"
                placeholder="Search by city"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              ></Input>
              <Button onClick={findByCity}>Search</Button>
            </InputGroup>
          </Col>

          <Col md="3 text-left">
            <InputGroup>
              <Input
                id="inputSearchByName"
                name="nameSearch"
                type="text"
                placeholder="Search by Name"
                onChange={(e) => {
                  setName1(e.target.value);
                }}
              ></Input>
              <Button onClick={findByName}>Search</Button>
            </InputGroup>
          </Col>

          <Col md="3 text-left">
            <InputGroup>
              <Input
                id="inputSearchByEmail"
                name="emailSearch"
                type="text"
                placeholder="Search by Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
              <Button onClick={findByEmail}>Search</Button>
            </InputGroup>
          </Col>
          <Col md="3 text-left">
            <InputGroup>
              <Input
                id="inputSearchByPan"
                name="panSearch"
                type="text"
                placeholder="Search by Pan No"
                onChange={(e) => {
                  setPan(e.target.value);
                }}
              ></Input>
              <Button onClick={findByPan}>Search</Button>
            </InputGroup>
          </Col>
        </Row>
        
        <Row>
        <Col md="3 text-left">
            <InputGroup>
              <Input
                id="inputSearchByPHone"
                name="phoneSearch"
                type="text"
                placeholder="Search by Phone No"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></Input>
              <Button onClick={findByPhone}>Search</Button>
            </InputGroup>
          </Col>
        </Row>

        {loading && <progress style={{ width: "100%" }}></progress>}
        {renderDataTable()}
      </div>
    </Fragment>
  );
}

export default App;
