import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration'
const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find events that help you improve..." />
      </Head>
      <NewsletterRegistration/>
      <EventList items={props.events} />
    </>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;
