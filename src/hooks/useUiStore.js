import { useDispatch, useSelector } from "react-redux";
import { onDateCloseModal, onDateOpenModal } from "../store";

export const useUiStore = () => {
    const {
        isDateModalOpen
    } = useSelector((state) => state.ui);

    const dispatch = useDispatch();

    const openDateModal = () => {
        dispatch(onDateOpenModal())
    }

    const closeDateModal = () => {
        dispatch(onDateCloseModal())
    }

    return {
        //properties
        isDateModalOpen,
        //Methods
        openDateModal,
        closeDateModal,
    };
};