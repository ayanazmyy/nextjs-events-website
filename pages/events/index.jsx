import React from 'react'
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-util';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Events = (props) => {
  const { allEvents } = props;
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find Events that help you improve..." />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={allEvents} />
    </>

  )
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      allEvents: events
    },
    revalidate: 600
  }
}

export default Events