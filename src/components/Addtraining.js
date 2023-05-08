import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { format, parseISO } from "date-fns";
import fi from "date-fns/locale/fi";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import IconButton from '@mui/material/IconButton';

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] =  useState(new Date().toISOString());
  const [training, setTraining] = useState({
    date: format(parseISO(date), 'yyyy-MM-dd'),
    duration: 0,
    activity: "",
    customer: props.customerId,

  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setTraining({...training, [e.target.name]: e.target.value})
  };

  const addTraining = () => {
    const updatedTraining = { ...training, date: format(parseISO(date), 'yyyy-MM-dd') };
    props.saveTraining(updatedTraining);
    handleClose();
  };

  return (
    <div>
         <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <IconButton
        onClick={handleClickOpen}
      >
        <FitnessCenterIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new training</DialogTitle>
        <DialogContent>
        <DatePicker
            value={parseISO(date)}
            onChange={(newDate) => setDate(newDate.toISOString())}
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={(e) => handleInputChange(e)}
            label="Duration (min)"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={(e) => handleInputChange(e)}
            label="Activity"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
      </LocalizationProvider>
    </div>
  );
}