import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const {
        events,
        activeEvent,
    } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const setActiveEvent = (event) => {
        dispatch(onSetActiveEvent(event))
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.uid) {
                await calendarApi.put(`/events/${calendarEvent.uid}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return
            }
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, uid: data.event.uid, user }))
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);

            dispatch(onLoadEvents(events));
        }
        catch (error) {
            console.log(error);
            Swal.fire('Error', error.response.data.msg, 'error');
        }
    }

    const deleteEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.uid}`);
            dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.response.data.msg, 'error');
        }
    }


    return {
        //properties
        events,
        activeEvent,
        //Methods
        deleteEvent,
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
    };
};