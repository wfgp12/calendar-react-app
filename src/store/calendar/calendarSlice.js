import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
    title: 'Cumpleaños Marcela',
    notes: 'This is a note',
    start: new Date(),
    end: addHours(new Date(), 1),
    user: {
        uid: '1',
        name: 'wfgp12',
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onAddEvent: (state, action) => {
            state.events.push(action.payload)
        },
        onRemoveEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload)
        },
    },
});

export const { onAddEvent, onRemoveEvent } = calendarSlice.actions;