import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Addcustomer from "./Addcustomer";
import Addtraining from "./Addtraining";
import Editcustomer from "./Editcustomer";
import { CSVLink } from "react-csv";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import DownloadIcon from '@mui/icons-material/Download';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setCustomers(responseData.content);
      })
      .catch((err) => console.error(err));
      
  };

  const saveCustomer = (customer) => {
    fetch("http://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const saveTraining = (training) => {
    console.log("Training data:", training);
  
    fetch("http://traineeapp.azurewebsites.net/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((res) => {
        console.log("Response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (params) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(params, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const updateCustomer = (customer, params) => {
    fetch(params, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const columnDefs = [
    
    { headerName: "First Name", field: "firstname", sortable: true, filter: true, resizable: true },
    { headerName: "Last Name",field: "lastname", sortable: true, filter: true, resizable: true },
    { headerName: "Street Address",field: "streetaddress", sortable: true, filter: true, resizable: true },
    { headerName: "Postal Code",field: "postcode", sortable: true, filter: true, resizable: true },
    { headerName: "City",field: "city", sortable: true, filter: true, resizable: true },
    { headerName: "Email",field: "email", sortable: true, filter: true, resizable: true },
    { headerName: "Phone Number",field: "phone", sortable: true, filter: true, resizable: true },
    {
      cellRenderer: (params) => (
        <Editcustomer updateCustomer={updateCustomer} customer={params.data} />
      ),  width: 70, maxWidth: 70, lockPosition: 'left',
    },
    {
      
      cellRenderer: (params) => (
        <Addtraining saveTraining={saveTraining} customerId={params.data.links[0].href} />
      ),  width: 70, maxWidth: 70, lockPosition: 'left',
    },
    {
      
      cellRenderer: (params) => (
        <IconButton
          onClick={() => deleteCustomer(params.data.links[0].href)}
        >
          <DeleteIcon color="error"/>
        </IconButton>
      ),  width: 70, maxWidth: 70,
    },
  ];

 const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Street Address", key: "streetaddress" },
    { label: "Postal code", key: "postcode" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
    { label: "Phone number", key: "phone" },

  ];


  return (
    <div>
      <Addcustomer saveCustomer={saveCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "100%", margin: "auto" }}
      >
        
        <AgGridReact
          columnDefs={columnDefs}
          rowData={customers}
          animateRows={true}
          pagination={true}
        ></AgGridReact>
        <Button>
        <CSVLink style={{color: "#02C262", fontSize: 16}}data={customers} headers={headers} filename="customerlist" separator={";"} > Customerlist.csv </CSVLink>
        </Button>
      </div>
      </div>
  );

}