import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const {
        events,
        activeEvent,
    } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (event) => {
        dispatch(onSetActiveEvent(event))
    }

    const startSavingEvent = async(calendarEvent) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent(calendarEvent))
        }else {
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const deleteEvent = () => {
        dispatch(onDeleteEvent())
    }


    return {
        //properties
        events,
        activeEvent,
        //Methods
        setActiveEvent,
        startSavingEvent,
        deleteEvent
    };
};