import "./App.css";
import { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { TablePagination } from "@mui/material";
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

function Home() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
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
  const [allData,setAllData]=useState([]);
  const [dropdownOpen, setOpen] = useState(false);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const findByCity = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/api/findByCity/${city}`)
      ).data;
      setLoading(false);
      setRows(result);
      setExcelRows(result);
      setCount(result.length);
    } catch (error) {
      setLoading(false);
    }
  };
  const findByName = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/api/findByName/${name1}`)
      ).data;
      setLoading(false);
      setExcelRows(result);
      setRows(result)
      setCount(result.length);

    } catch (error) {
      setLoading(false);
    }
  };
  const findByEmail = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/api/findByEmail/${email}`)
      ).data;
      setLoading(false);
      setRows(result);
      setExcelRows(result);
      setCount(result.length);

    } catch (error) {
      setLoading(false);
    }
  };
  const findByPan = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/api/findByPan/${pan}`)
      ).data;
      setLoading(false);
      setRows(result);
      setExcelRows(result);

      setCount(result.length);

    } catch (error) {
      setLoading(false);
    }
  };

  const findByPhone = async () => {
    try {
      setRows([]);
      setLoading(true);
      const result = (
        await axios.get(`http://localhost:5000/api/findByPhone/${phone}`)
      ).data;
      if (result) {
        const keys = Object.keys(result[0]);
        setTableHeading(keys);
      }
      setLoading(false);
      setRows(result);
      setExcelRows(result);
      setCount(result.length);

    } catch (error) {
      setLoading(false);
    }
  };

  // Function to filter objects with key "Whatsapp" and value "unused" (case-insensitive)
function filterUsedData(arr) {
  setLoading(true);

  const uppercaseKey = 'WHATS APP';
  const uppercaseValue = 'UNUSED';

  const newArr = arr.filter(obj => 
    obj[uppercaseKey]?.toUpperCase() === uppercaseValue.toUpperCase()
  );

  if (newArr.length>0) {
    const keys = Object.keys(newArr[0]);
    setTableHeading(keys);
  }
  console.log(newArr);
  setRows(newArr);
  setCount(newArr.length)
  setExcelRows(newArr)
  renderDataTable();
  setLoading(false);
}


function filterBankData(arr) {
  setLoading(true);

  const firstConditionKey = 'LOGIN BANK 2';
  const firstConditionValue = 'SBI BANK';

  const secondConditionKey = 'BANKS STATUS_1';
  const secondConditionValue = 'rejected';

  const newArr = arr.filter(obj => 
    obj[firstConditionKey]?.toUpperCase() === firstConditionValue.toUpperCase() &&
    obj[secondConditionKey]?.toUpperCase() === secondConditionValue.toUpperCase()
  );

  if (newArr.length > 0) {
    const keys = Object.keys(newArr[0]);
    setTableHeading(keys);
  }

  console.log(newArr);
  setRows(newArr);
  setCount(newArr.length);
  setExcelRows(newArr);
  renderDataTable();
  setLoading(false);
}


  // const findByWhatsappStatus = async () => {
  //   try {
  //     setRows([]);
  //     setLoading(true);
  //     const result = (
  //       await axios.get(`http://localhost:5000/api/findByWhatsappStatus`)
  //     ).data;
  //     if (result) {
  //       const keys = Object.keys(result[0]);
  //       setTableHeading(keys);
  //     }
  //     setLoading(false);
  //     setRows(result);
  //     setExcelRows(result);
  //     setCount(result.length);

  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };
  
  // const findByBankNameAndStatus = async () => {
  //   try {
  //     setRows([]);
  //     setLoading(true);
  //     const result = (
  //       await axios.get(`http://localhost:5000/api/findByBankNameAndStatus`)
  //     ).data;
  //     if (result) {
  //       const keys = Object.keys(result[0]);
  //       setTableHeading(keys);
  //     }
  //     setLoading(false);
  //     setRows(result);
  //     setExcelRows(result);
  //     setCount(result.length);

  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  const fetchAllData = async () => {
    try {
      
      setLoading(true);
      const result = (
        await axios.get(
          `http://localhost:5000/api/read`
        )
      ).data;
      if (result) {
        const keys = Object.keys(result[0]);
        setTableHeading(keys)
      }
      setAllData(result);
      setExcelRows(result)
      setCount(result.length)
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setRows([]);
      setExcelRows([]);
      setCount(0);
      setLoading(true);
      const result = (
        await axios.get(
          `http://localhost:5000/api/readPagination?page=${page}&pageSize=${rowsPerPage}`
        )
      ).data;
      setLoading(false);
      if (result) {
        const keys = Object.keys(result.articles.data[0]);
        setTableHeading(keys);
      }
      setCount(Math.ceil(result.articles.metadata.totalCount));
      setExcelRows(result.articles.data);
    } catch (err) {
      setLoading(false);
    }
  };

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
        setCount(result.length);
        setExcelRows(result);

        // Compare file to that with database
        compareData(result);
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const renderDataTable = () => {
    if (excelRows.length > 0) {
      const paginatedData = excelRows.slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
      );
      return (
        <>
        <Table>
  <thead>
    <tr>
      {tableHeading.map((key) => (
        <th key={key}>{key}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {excelRows.length > 0
      ? paginatedData.map((item, id) => (
          <tr key={id}>
            {tableHeading.map((key, index) => (
              <td key={index}>{item[key]}</td>
            ))}
          </tr>
        ))
      : rows.map((item, id) => (
          <tr key={id}>
            {tableHeading.map((key, index) => (
              <td key={index}>{item[key]}</td>
            ))}
          </tr>
        ))}
  </tbody>
</Table>

          {/* <Pagination total={count} current={page} onChange={(value)=>setPage(value)}/> */}
          <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[1, 25, 50, 100]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
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
      setTableHeading([]);

      const firstItemKeys = excelRows[0] && Object.keys(excelRows[0]);
      let requiredValidation = false;

      if (firstItemKeys.length) {
        requiredFields.forEach((element) => {
          if (!firstItemKeys.find((x) => x === element)) {
            requiredValidation = true;
          }
        });

        setTableHeading(firstItemKeys);
      }

      if (requiredValidation) {
        alert("Required fields " + JSON.stringify(requiredFields), "+ missing");
        setLoading(false);
        return;
      }

      const response = (await axios.get("http://localhost:5000/api/read")).data;
      const data = response || [];

      const result = excelRows.map((obj, index) => {
        const mappedObject = {};

        tableHeading.forEach((key) => {
          if (key === "MOBILE NO") {
            const existingRecord = data.find(
              (record) => String(record["MOBILE NO"]) === String(obj[key])
            );
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
        try {
          const result = await axios.post(
            "http://localhost:5000/api/update",
            updatedData,
            { headers: { "Content-Type": "application/json" } }
          );
      
          if (result.data && result.data.success) {
            alert("Successfully update " + updatedData.length + " documents");
          } else {
            // Handle the case where the update was not successful
            alert("Failed to update documents");
          }
        } catch (error) {
          // Handle any errors that occurred during the API call
          console.error("Error updating documents:", error);
          alert("Error updating documents");
        }
      }
      

      if (newData.length) {
        const result = (
          await axios.post("http://localhost:5000/api/test", newData)
        ).data;

        if (result) {
          alert("successfully added " + newData.length + " documents");
        }
      }

      fetchData();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Failed");
      console.log("upload Error :", err);
    }
  };

  const compareData = async (result) => {
    console.log(result);

    try {
      setLoading(true);

      // Use await directly with axios.post
      const response = await axios.post(
        "http://localhost:5000/api/compare",
        result
      );

      setLoading(false);
    } catch (error) {
      console.error("Error during comparison:", error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchAllData();
  },[])

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

        <Row className="marginBottom20">
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

        <Row className="marginBottom20">
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

        <Row className="marginBottom20">
          <Col md="3 text-left">
           
             
              <Button onClick={()=>filterUsedData(allData)}>UNUSED whatsapp</Button>
            
          </Col>
          <Col md="3 text-left">
           
             
              <Button onClick={()=>filterBankData(allData)}>AXIS BANK status</Button>
            
          </Col>
        </Row>

        {excelRows.length > 0 ? (
          <Row>
            <Col md="6 text-left">
             {<h3>Total Entry: {count}</h3>}
            </Col>
          </Row>
        ) : (
          ""
        )}

        {loading ? (
          <progress style={{ width: "100%" }}></progress>
        ) : (
          renderDataTable()
        )}
        {}
      </div>
    </Fragment>
  );
}

export default Home;
