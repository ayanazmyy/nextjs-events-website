import classes from './comment-list.module.css';

function CommentList(props) {

  const {items, eventId} = props;
  const selectedEventComments = items.filter(item => item.eventId === eventId)
  
  return (
    <ul className={classes.comments}>
      {
        selectedEventComments.map( item => (
          <li key={item._id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))
      }
    </ul>
  );
}




export default CommentList;
