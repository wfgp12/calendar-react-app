import { useCalendarStore } from "../../hooks/"


export const FabDelete = () => {

    const { deleteEvent } = useCalendarStore();

    const handleClick = () => {
        deleteEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleClick}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
