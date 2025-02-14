

import PropTypes from 'prop-types';

export const CalendarEvent = ({ event }) => {

    const { title, user } = event;
    return (
        <div>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </div>
    )
}

CalendarEvent.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string,
        user: PropTypes.shape({
            name: PropTypes.string,
        })
    }).isRequired
};
