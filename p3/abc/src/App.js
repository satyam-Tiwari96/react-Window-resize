import logo from "./logo.svg";
import "./App.css";
import { Input, Radio, Table } from "antd";
import SplitPane from "react-split-pane";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    mobile: "",
    gender: "",
  });
  const [editingRecord, setEditingRecord] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/get_user");
      const result = response.data;
      const activeRecords = result?.data?.filter(
        (record) => record.is_deleted === "active"
      );
      setRecords(activeRecords);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingRecord) {
        await axios.put(
          `http://localhost:8080/user/get_user/${editingRecord._id}`,
          data
        );
        toast.success("Record updated successfully");
        setEditingRecord(null);
      } else {
        await axios.post("http://localhost:8080/user/create", data);
        toast.success("Record added successfully");
      }
      fetchData();
      setData({ username: "", email: "", mobile: "", gender: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to perform operation");
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setData(record);
    setShowForm(true);
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:8080/user/get_user/${record._id}`);
      toast.success("Record deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete record");
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <button className="btn btn" onClick={() => handleEdit(record)}>
            <MdOutlineEdit style={{ color: "#5C86B4", background: "none" }} />
            &nbsp; Edit
          </button>
          <button className="btn btn" onClick={() => handleDelete(record)}>
            <RiDeleteBinLine
              style={{ color: "red", background: "none", border: "none" }}
            />
            &nbsp; Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <SplitPane split="horizontal" size="50%">
      <SplitPane split="vertical" size="50%">
        <div className="container">
          <button className="styled-button" onClick={() => setShowForm(true)}>
            Add Data
          </button>
        </div>
        {showForm ? (
          <div style={{ margin: "50px" }}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="row">
                    <label
                      htmlFor="InputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Username
                    </label>
                    <div className="col-sm-9">
                      <Input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Vorname"
                        //className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label
                      htmlFor="InputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-9">
                      <Input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="E-Mail"
                        //className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label className="col-sm-3 col-form-label">Mobile</label>
                    <div className="col-sm-9">
                      <Input
                        type="number"
                        name="mobile"
                        value={data.mobile}
                        onChange={handleChange}
                        placeholder="987+567+98765"
                        //className="form-control"
                      />
                    </div>
                  </div>
                  {/* <div className="row">
                  <label
                    htmlFor="InputPassword"
                    className="col-sm-3 col-form-label"
                  >
                    Password
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      //className="form-control"
                    />
                  </div>
                </div> */}
                  <div className="mb-6 row">
                    <label
                      htmlFor="InputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Gender
                    </label>
                    <div className="col-sm-8 mt-1">
                      {/* <div className="d-flex"> */}
                      <div className="radio-wrap d-flex">
                        <div className="radio-Input">
                          <Radio
                            type="radio"
                            id="male"
                            value="male"
                            name="gender"
                            onChange={handleChange}
                            checked={data.gender === "male"}
                          />
                          <span>Male</span>
                        </div>

                        <div className="radio-Input">
                          <Radio
                            type="radio"
                            id="female"
                            value="female"
                            name="gender"
                            onChange={handleChange}
                            checked={data.gender === "female"}
                          />
                          <span>Female</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="text-end">
                <button className="styled-button" type="submit">
                  {editingRecord ? "Update Record" : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <h3 className="text">
              Please add some data for the page to be displayed
            </h3>
          </>
        )}
      </SplitPane>
      <div style={{ width: "100%", height: "100%" }} size="50%">
        <div className="row mx-3 mt-3">
          <Table
            dataSource={records}
            columns={columns}
            pagination={{ pageSize: 4 }}
            responsive="stack"
            rowKey={(record) => record._id}
            rowSelection={{
              type: "checkbox",
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(
                  `selectedRowKeys: ${selectedRowKeys}`,
                  "selectedRows: ",
                  selectedRows
                );
              },
              getCheckboxProps: (record) => ({
                disabled: record.name === "Disabled User",
                name: record.name,
              }),
            }}
          />
        </div>
        <ToastContainer />
      </div>
    </SplitPane>
  );
}

export default App;
