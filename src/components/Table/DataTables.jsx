import React from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import "./DataTables.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";

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
      alert("User don't added");
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
            <div className="formBody">
              <div className="AddForm">
                <span className="editText">Edit User</span>

                <form onSubmit={getEditUser}>
                  <input
                    className="input"
                    type="text"
                    placeholder="User *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Role *"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Plane *"
                    value={plane}
                    onChange={(e) => setPlane(e.target.value)}
                    required
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Status *"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  />
                  <div className="formButtons">
                    <button
                      className="btn btn_add btnClearAdd"
                      type="button"
                      style={{ backgroundColor: "red" }}
                      onClick={() => setEditUser(!editUser)}
                    >
                      Close
                    </button>
                    <button className="btn btn_add" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
            <div className="tableHeader">
              <button
                className="btn btn_export"
                onClick={() => alert("Export")}
              >
                <IosShareIcon />
                Export
              </button>
              <div className="searchAndAdd">
                <input
                  type="text"
                  placeholder="Search Users"
                  className="input searchInput"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn_add"
                  onClick={() => setAddUser(!addUser)}
                >
                  Add User
                </button>
              </div>
            </div>
          }
        />
      </div>
      {addUser ? (
        <div className="formBody">
          <div className="AddForm">
            <span className="editText">Add User</span>

            <form onSubmit={getPostUser}>
              <input
                className="input"
                type="text"
                placeholder="User *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Role *"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Plane *"
                value={plane}
                onChange={(e) => setPlane(e.target.value)}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Status *"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <div className="formButtons">
                <button
                  className="btn btn_add btnClearAdd"
                  type="button"
                  style={{ backgroundColor: "red" }}
                  onClick={() => setAddUser(!addUser)}
                >
                  CLose
                </button>
                <button className="btn btn_add btnAdd" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DataTables;
