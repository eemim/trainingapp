import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { format, parseISO } from "date-fns";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';




export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .catch((err) => console.error(err));
  };

  const customerNameGetter = (params) => {
    return params.data.customer.firstname +" "+ params.data.customer.lastname;
  };

  const dateParser = (params) => {
    try {
      return format(parseISO(params.data.date), 'dd.MM.yyyy');
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const deleteTraining = (params) => {
    const trainingId = params.data.id;
  
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch(`http://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };


  const columnDefs = [
    { headerName:"Activity", field: "activity", sortable: true, filter: true },
    { headerName:"Date", valueGetter: dateParser, sortable: true, filter: true },
    { headerName:"Duration (min)", field: "duration", sortable: true, filter: true },
    { headerName:"Customer", valueGetter: customerNameGetter , sortable: true, filter: true },
    {
      
      cellRenderer: (params) => (
        <IconButton
          onClick={() => deleteTraining(params)}
        >
         <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];



  return (
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "100%", margin: "auto" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={trainings}
          animateRows={true}
          pagination={true}
        ></AgGridReact>
        </div>

  );

}