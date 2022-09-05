import EventItem from "./event-item";
import classes from './event-list.module.css';

function EventList(props) {
    const { items } = props;

    return (
        <ul className={classes.list}>
            {items.map(event => <EventItem
                key={event.id}
                title={event.title}
                image={event.image}
                id={event.id}
                location={event.location}
                date={event.date}
            />)}
        </ul>
    )
}

export default EventList;