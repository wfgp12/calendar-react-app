import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal"
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 1),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return formValues.title.length > 0 ? '' : 'is-invalid'
    }, [formValues.title, formSubmitted])


    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({...activeEvent})
            
        }
      return () => {
        setFormValues({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 1),
        })
      }
    }, [activeEvent])
    

    const onChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const onChangeDate = (event, changing) => {
        setFormValues({ ...formValues, [changing]: event })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Debes revisar que las fechas sean correctas', 'error')

            return
        }

        if (formValues.title.length <= 0) return
        
        console.log(formValues);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onChangeDate(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onChangeDate(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
