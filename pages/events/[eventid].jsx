import { getFeaturedEvents, getEventById } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';
import Comments from '../../components/input/comments'

function EventDetails(props) {

  if (!props.event) {
    return (
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{props.event.title}</title>
        <meta name="description" content={props.event.description} />
      </Head>
      <EventSummary title={props.event.title} />
      <EventLogistics
        date={props.event.date}
        address={props.event.location}
        image={props.event.image}
        imageAlt={props.event.title}
      />
      <EventContent>
        <p>{props.event.description}</p>
      </EventContent>
      <Comments eventId={props.event.id}/>
    </>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventid;
  const event = await getEventById(eventId);

  return {
    props: {
      event: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths(context) {
  const allEvents = await getFeaturedEvents();

  const ids = allEvents.map(event => event.id);

  const paramsWithPaths = ids.map(id => ({ params: { eventid: id } }));

  return {
    paths: paramsWithPaths,
    fallback: 'blocking'
  }
}

export default EventDetails;