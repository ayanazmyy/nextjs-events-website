import { useState, useEffect, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);

      fetch(`/api/comments/${eventId}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }

          return response.json().then(data => {
            throw new Error("Loading comments failed!")
          })
        })
        .then(data => {
          setComments(data.comments);
          setIsLoading(false)
        })
        .catch(error => {
          setIsLoading(false);
        })
    }
  }, [showComments]);


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Loading",
      message: "Please wait until comments are loaded",
      status: "pending"
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return res.json().then(data => {
          throw new Error('Something went wrong!')
        })
      })
      .then(data => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Your comment was added successfully!",
          status: "success"
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: "Error",
          message: "Posting your comment failed!",
          status: "error"
        });
      })
  }


  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} eventId= {eventId}/>}
      {isLoading && <p>Loading...</p>}
    </section>
  );
}



export default Comments;
