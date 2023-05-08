import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import Showcalendar from "./Showcalendar";
import Box from '@mui/material/Box';

export default function TabApp() {

    const [value, setValue] = useState('customers');
    const handleChange = (event, value) => {
        setValue(value);
    };

  return(
    
    <div>
      <Box sx={{ borderBottom: 5, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
           <Tab value="customers" label="Customers" />
           <Tab value="trainings" label="Trainings" /> 
           <Tab value="calendar" label="Calendar" />
        </Tabs>
        </Box>
        {value === 'customers' && <div> <Customerlist /> </div>}
        {value === 'trainings' && <div><Traininglist /></div>}
        {value === "calendar" && <div><Showcalendar /></div>}
  </div>
);
}