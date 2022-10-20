import React from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import "./DataTables.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import Form from "../form/Form";
import TableHeader from "./TableHeader";

function DataTables() {
  const [dataUsers, setDataUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteUsers, setDeleteUsers] = useState([]);
  const [postUser, setPostUser] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [plane, setPlane] = useState("");
  const [status, setStatus] = useState("");
  const dataApi = `https://62fc8fecb9e38585cd412f60.mockapi.io/cources`;

  useEffect(() => {
    getDataUsers();
  }, [deleteUsers, postUser]);

  useEffect(() => {
    const result = dataUsers.filter((user) => {
      return user.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredUsers(result);
  }, [search]);

  const clear = (value) => {
    setStatus((value = ""));
    setPlane((value = ""));
    setRole((value = ""));
    setEmail((value = ""));
    setName((value = ""));
  };

  const getDataUsers = async () => {
    try {
      const response = await axios.get(dataApi);
      setDataUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(dataApi, {
        name: name,
        email: email,
        role: role,
        plane: plane,
        status: status,
      });
      setPostUser(resp.data);
      alert("User added");
      clear();
    } catch (error) {
      clear();
    }
  };
  
  const getEditUser = async (e, id) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        dataApi,
        { name: name, email: email, role: role, plane: plane, status: status }
      );
      setDeleteUsers((prev) => prev.filter((item) => item.id === id));
      setPostUser(resp.data);
      alert("User Edited")
      clear();

    } catch (error) {
      alert("Update error");
      clear();
    }
  };

  const userDelete = async (id) => {
    const respD = await axios.delete(
      `https://62fc8fecb9e38585cd412f60.mockapi.io/cources/${id}`
    );
    setDeleteUsers((prev) => prev.filter((item) => item.id !== id));
    return setDataUsers, alert('User deleted');
  };

  const columns = [
    {
      name: "USERS",
      selector: (row) => row.name,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
    },
    {
      name: "PLANE",
      selector: (row) => row.plane,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
    },
    {
      name: "ACTION",
      cell: (row) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            className="btn btn_edit"
            onClick={() => setEditUser(!editUser)}
          >
            <EditIcon />
          </button>
          {editUser ? (
            <Form
            userManipulation ="Edit User"
            getPostUser={getEditUser}
            getUser={(e) => setName(e.target.value)}
            getEmail={(e) => setEmail(e.target.value)}
            getRole={(e) => setRole(e.target.value)}
            getPlane={(e) => setPlane(e.target.value)}
            getStatus={(e) => setStatus(e.target.value)}
            getSetAddUsers={() => setEditUser(!editUser)}
  
            valueName={name}
            valueEmail={email}
            valueRole={role}
            valuePlane={plane}
            valueStatus={status}
            CLose="Close"
            formSend="Save"
          />
          ) : null}
          <button className="btn btn_delete" onClick={() => userDelete(row.id)}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <DataTable
          title="User List"
          columns={columns}
          data={filteredUsers}
          pagination
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <TableHeader
              clickExport={() => alert("Export")}
              searchInput={(e) => setSearch(e.target.value)}
              exportIcon= {<IosShareIcon />}
              searchValue={search}
              btnAddTop={() => setAddUser(!addUser)}
            />
          }
        />
      </div>
      {addUser ? (
        <Form
          userManipulation ="Add User"
          getPostUser={getPostUser}
          getUser={(e) => setName(e.target.value)}
          getEmail={(e) => setEmail(e.target.value)}
          getRole={(e) => setRole(e.target.value)}
          getPlane={(e) => setPlane(e.target.value)}
          getStatus={(e) => setStatus(e.target.value)}
          getSetAddUsers={() => setAddUser(!addUser)}

          valueName={name}
          valueEmail={email}
          valueRole={role}
          valuePlane={plane}
          valueStatus={status}
          CLose="Close"
          formSend="Add"
        />
      ) : null}
    </>
  );
}

export default DataTables;
