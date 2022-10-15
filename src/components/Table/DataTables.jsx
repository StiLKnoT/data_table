import React from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";
import './DataTables.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IosShareIcon from '@mui/icons-material/IosShare';




function DataTables() {
  const [dataUsers, setDataUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([])
  const [deleteUsers, setDeleteUsers] = useState([])
  const [addUser, setAddUser] = useState(false)
  const [postUser,setPostUser] = useState([])
  const [addUsers, setAddUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [plane, setPlane] = useState('')
  const [status, setStatus] = useState('')
  const dataApi = "https://62fc8fecb9e38585cd412f60.mockapi.io/cources"

  useEffect(() => {
    getDataUsers();
  }, [deleteUsers, postUser]);

  useEffect(() => {
    const result = dataUsers.filter(user => {
        return user.name.toLowerCase().match(search.toLowerCase());
    })

    setFilteredUsers(result)
    console.log(result)

  }, [search]);


  
  



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
    e.preventDefault()
    try {
      const resp = await axios.post(dataApi,{name:name, email:email, role:role, plane:plane, status:status});
      setPostUser(resp.data)
      console.log(resp.data)
     

    } catch (error) {
      console.log(error);
    }
  };

 

  const userDelete = async (id)=>{
    const respD = await axios.delete(`https://62fc8fecb9e38585cd412f60.mockapi.io/cources/${id}`);
    setDeleteUsers(prev=>prev.filter((item)=>item.id!==id));    
    return setDataUsers
  }



  

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
      cell: row =><div style={{display:"flex", flexDirection:"row"}}>
        <button className="btn btn_edit" onClick={()=> alert(row.id)}><EditIcon/></button>
        {/* <a href="/"> */}
          <button className="btn btn_delete" onClick={()=> userDelete(row.id)}><DeleteIcon/></button>
        {/* </a> */}
        
      </div>
    },
  ];






  return (
    <>
    <div >
      <DataTable 
        title="User List"
        columns={columns}
        data={filteredUsers}
        pagination
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        // actions={
        //     <button>Export</button>
        // }
        subHeader
        subHeaderComponent={
            <div className="tableHeader" >
                <button className="btn btn_export" onClick={()=> alert("Export")}><IosShareIcon/>Export</button>
                <div className="searchAndAdd">
                    <input type="text" placeholder="Search Users" className="input searchInput" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button className="btn btn_add" onClick={() => setAddUser(!addUser)}>Add User</button>

                </div>
          
            </div>
        }
      />
    </div>
    {addUser? (<div className="formBody"><div className="AddForm">
      <form onSubmit={getPostUser}>
        <input className="input" type="text" placeholder="User" value={name} onChange={(e)=>setName(e.target.value)} required/>
        <input className="input" type="text" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input className="input" type="text" placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)} required/>
        <input className="input" type="text" placeholder="Plane" value={plane} onChange={(e)=>setPlane(e.target.value)} required/>
        <input className="input" type="text" placeholder="Status" value={status} onChange={(e)=>setStatus(e.target.value)} required/>
        <div className="formButtons">
          <button className="btn btn_add" style={{backgroundColor:"green"}} onClick={()=>setAddUser(!addUser)}>Save</button>

          <button className="btn btn_add" type="submit">Add</button>
        </div>
      </form>

    </div></div>): null }

    </>
  );
}

export default DataTables;
