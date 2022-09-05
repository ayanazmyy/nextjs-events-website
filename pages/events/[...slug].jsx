import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert'
import { getFilteredEvents } from '../../helpers/api-util';
import Head from 'next/head';

function FilteredEvents(props) {
    const pageHeadContent = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`Events for ${props.numMonth}/${props.numYear}`} />
        </Head>
    )

    if (props.hasError) {
        return (
            <>
                {pageHeadContent}
                <ErrorAlert>
                    <p className='center'>Invalid filter, Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        )
    }

    if (!props.filteredEvents) {
        return <p className='center'>Loading...</p>
    }

    if (props.filteredEvents.length === 0 || !props.filteredEvents) {
        return (
            <>
                {pageHeadContent}
                <ErrorAlert>
                    <p className='center'>No events found!</p>
                </ErrorAlert>

                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        )
    }

    const date = new Date(props.numYear, props.numMonth - 1);



    return (
        <>
            {pageHeadContent}
            <ResultsTitle date={date} />
            <EventList items={props.filteredEvents} />
        </>
    )
}


export async function getServerSideProps(context) {
    const { params } = context;

    const filteredData = params.slug;

    const FilteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +FilteredYear;
    const numMonth = +filteredMonth;



    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numMonth > 12 ||
        numMonth < 1
    ) {
        return {
            props: {
                hasError: true
            },
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });


    return {
        props: {
            filteredEvents: filteredEvents,
            numYear,
            numMonth
        }
    }

}

export default FilteredEvents;