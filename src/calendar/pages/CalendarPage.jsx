import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { CalendarEvent, CalendarModal, Navbar } from "../components";
import { localizer, getMessagesES } from "../../helpers";
import { useState } from 'react';

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
   const [lastView] = useState(localStorage.getItem('lastView') || 'month');
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#2196F3',
        border: '1px solid #2196F3',
      },
    }
  }

  const ondDoubleClick = (event) => {
    console.log({ doubleClick: event })
  }

  const onSelect = (event) => {
    console.log({ click: event })
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={myEventsList}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={ondDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  )
}
