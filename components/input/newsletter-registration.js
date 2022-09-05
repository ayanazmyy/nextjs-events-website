import classes from './newsletter-registration.module.css';
import { useRef, useState, useContext } from 'react';
import NotificationContext from '../../store/notification-context';


function NewsletterRegistration() {
  const [emailInput, setEmailInput] = useState('');

  const notificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const reqBody = { email: enteredEmail }

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for the newsletter.",
      status: "pending"
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(data => {
          throw new Error("Something went wrong!")
        });

      })
      .then(data => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for the newsletter.",
          status: "success"
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: "Error",
          message: "Something went wrong!",
          status: "error"
        });
      })

      


    setEmailInput('');
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
            value={emailInput}
            onChange={(e) => { setEmailInput(e.target.value) }}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
