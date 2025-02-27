import { createSlice } from "@reduxjs/toolkit"


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
    },
    reducers: {
        onDateOpenModal: (state) => {
            state.isDateModalOpen = true
        },
        onDateCloseModal: (state) => {
            state.isDateModalOpen = false
        },
    },
})

export const { onDateOpenModal, onDateCloseModal } = uiSlice.actions