import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.uid === payload.uid) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.uid !== state.activeEvent.uid);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            state.events = payload;
            payload.forEach(event => {
                const exist = state.events.some(dbEvent => dbEvent.uid === event.uid);
                if (!exist) {
                    state.events.push(event);
                }
            });
        },
        onClearEvents: (state) => {
            state.events = [];
            state.activeEvent = null;
        },
    },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onClearEvents } = calendarSlice.actions;