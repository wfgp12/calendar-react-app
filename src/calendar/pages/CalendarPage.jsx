import { useEffect, useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../components";
import { localizer, getMessagesES } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { events, activeEvent, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();

  useEffect(() => {
    startLoadingEvents();
  }, []);


  const [lastView] = useState(localStorage.getItem('lastView') || 'month');


  const eventStyleGetter = (event) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    return {
      style: {
        backgroundColor: isMyEvent ? '#2196F3' : '#465660',
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
