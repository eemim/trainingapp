import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((responseData) => setCustomers(responseData.content))
      .catch((err) => console.error(err));
  };

  const columnDefs = [
    { headerName: "First Name", field: "firstname", sortable: true, filter: true },
    { headerName: "Last Name",field: "lastname", sortable: true, filter: true },
    { headerName: "Street Address",field: "streetaddress", sortable: true, filter: true },
    { headerName: "Postal Code",field: "postcode", sortable: true, filter: true },
    { headerName: "City",field: "city", sortable: true, filter: true },
    { headerName: "Email",field: "email", sortable: true, filter: true },
    { headerName: "Phone Number",field: "phone", sortable: true, filter: true },
  ];

  return (

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
      </div>
  );

}