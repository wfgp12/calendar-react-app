import { useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../components";
import { localizer, getMessagesES } from "../../helpers";
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {
  const {events, activeEvent, setActiveEvent} = useCalendarStore();
  const {openDateModal} = useUiStore();

  const [lastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#2196F3',
        border: '1px solid #2196F3',
      },
    }
  }

  const ondDoubleClick = () => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
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
        events={events}
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
      <FabAddNew />

      {activeEvent && <FabDelete />}
    </>
  )
}
