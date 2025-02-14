import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { CalendarEvent, Navbar } from "../components";
import { localizer, getMessagesES } from "../../helpers";

const myEventsList = [
  {
    title: 'Cumpleaños Marcela',
    notes: 'This is a note',
    start: new Date(),
    end: addHours(new Date(), 3),
    user: {
      uid: '1',
      name: 'wfgp12',
    }
  },
]


export const CalendarPage = () => {
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#2196F3',
        border: '1px solid #2196F3',
      },
    }
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
    </>
  )
}
