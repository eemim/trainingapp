import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import {useEffect, useState} from 'react';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fi from "date-fns/locale/fi";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parseISO } from "date-fns";


export default function ShowCalendar() {
  const locales = {
    'fi-FI': fi,
  };

  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .catch((err) => console.error(err));
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });


  const events = trainings.map(training => ({
    title: training.activity+" "+training.duration+ " min. "+
    training.customer.firstname+" "+training.customer.lastname,
    start: parseISO(training.date),
    end: parseISO(training.date),
  }));

  return (
    <div>
    <Calendar
      localizer={localizer}
      events={events}
      style={{ height: 500 }}
    />
  </div>
  );
}