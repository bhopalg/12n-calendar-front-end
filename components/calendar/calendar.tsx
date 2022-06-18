import styles from "../../styles/calendar.module.css";

/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useEffect, useState} from "react";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import {gql, useApolloClient, useQuery} from "@apollo/client";
import moment, {Moment} from 'moment';
import { groupBy } from 'ramda'

interface Day {
    date: string;
    isCurrentMonth: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    events: {
        id: string;
        projectName: string;
        websiteURL: string;
        description: string;
        datetime: string;
        bannerURL: string;
        profilePicURL: string;
        links: {
            twitterLink: string;
            instagramLink: string;
            etherscanLink: string;
            discordLink: string;
            openSeaLink: string;
        }
    }[]
}

const days = [
    { date: "2022-05-30", isCurrentMonth: false, events: [] },
    { date: "2022-05-31", isCurrentMonth: false, events: [] },
    { date: "2022-06-01", isCurrentMonth: true, events: [] },
    { date: "2022-06-02", isCurrentMonth: true, events: [] },
    {
        date: "2022-06-03",
        isCurrentMonth: true,
        events: [
            {
                id: 1,
                name: "Design review",
                time: "10AM",
                datetime: "2022-06-03T10:00",
                websiteURL: "#",
            },
            {
                id: 2,
                name: "Sales meeting",
                time: "2PM",
                datetime: "2022-06-03T14:00",
                websiteURL: "#",
            },
        ],
    },
    { date: "2022-06-04", isCurrentMonth: true, events: [] },
    { date: "2022-06-05", isCurrentMonth: true, events: [] },
    { date: "2022-06-06", isCurrentMonth: true, events: [] },
    {
        date: "2022-06-07",
        isCurrentMonth: true,
        events: [
            {
                id: 3,
                name: "Date night",
                time: "6PM",
                datetime: "2022-06-08T18:00",
                websiteURL: "#",
            },
        ],
    },
    { date: "2022-06-08", isCurrentMonth: true, events: [] },
    { date: "2022-06-09", isCurrentMonth: true, events: [] },
    { date: "2022-06-10", isCurrentMonth: true, events: [] },
    { date: "2022-06-11", isCurrentMonth: true, events: [] },
    {
        date: "2022-06-12",
        isCurrentMonth: true,
        events: [
            {
                id: 6,
                name: "Sam's birthday party",
                time: "2PM",
                datetime: "2022-06-25T14:00",
                websiteURL: "#",
            },
        ],
    },
    { date: "2022-06-13", isCurrentMonth: true, events: [] },
    { date: "2022-06-14", isCurrentMonth: true, events: [] },
    { date: "2022-06-15", isCurrentMonth: true, events: [] },
    { date: "2022-06-16", isToday: true, isCurrentMonth: true, isSelected: true, events: [] },
    { date: "2022-06-17", isCurrentMonth: true, events: [] },
    { date: "2022-06-18", isCurrentMonth: true, events: [] },
    { date: "2022-06-19", isCurrentMonth: true, events: [] },
    { date: "2022-06-20", isCurrentMonth: true, events: [] },
    { date: "2022-06-21", isCurrentMonth: true, events: [] },
    {
        date: "2022-06-22",
        isCurrentMonth: true,
        isSelected: false,
        events: [
            {
                id: 4,
                name: "Maple syrup museum",
                time: "3PM",
                datetime: "2022-06-22T15:00",
                websiteURL: "#",
            },
            {
                id: 5,
                name: "Hockey game",
                time: "7PM",
                datetime: "2022-06-22T19:00",
                websiteURL: "#",
            },
        ],
    },
    { date: "2022-06-23", isCurrentMonth: true, events: [] },
    { date: "2022-06-24", isCurrentMonth: true, events: [] },
    { date: "2022-06-25", isCurrentMonth: true, events: [] },
    { date: "2022-06-26", isCurrentMonth: true, events: [] },
    { date: "2022-06-27", isCurrentMonth: true, events: [] },
    { date: "2022-06-28", isCurrentMonth: true, events: [] },
    { date: "2022-06-29", isCurrentMonth: true, events: [] },
    { date: "2022-06-30", isCurrentMonth: true, events: [] },
];
const selectedDay = days.find((day) => day.isSelected);

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const QUERY = gql`
  query listNFTCalendarEvents($between: [String!]) {
    listNFTCalendarEvents(filter: {dropDateTime: {between: $between}}) {
        items {
          bannerURL
          dropDateTime
          description
          id
          links {
            discordLink
            etherscanLink
            instagramLink
            openSeaLink
            twitterLink
          }
          profilePicURL
          projectName
          websiteURL
        }
      }
  }
`;

export default function Calendar() {
    const client = useApolloClient();
    const [events, setEvents] = useState([] as Day[]);
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const [selectedEvent, setSelectedEvent] = useState<Day | null>(null);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const startDate = `${selectedDate.startOf('month').format('YYYY-MM-DD')}T00:00:00Z`;
        const endDate = `${selectedDate.endOf('month').format('YYYY-MM-DD')}T00:00:00Z`;

        const { data, loading, error } = await client.query({
            query: QUERY,
            variables: {
                between: [startDate, endDate],
            }
        });

        let groupedEvents = null;
        if (data?.listNFTCalendarEvents?.items.length > 0) {
            groupedEvents = groupBy((s: any) => moment(s.dropDateTime).format('YYYY-MM-DD'), data?.listNFTCalendarEvents?.items);
        }
            // pad front and back on the list

            const innerEvents: Day[] = [];

            let startDateMoment: number = selectedDate.startOf('month').valueOf();
            const endDateMoment: number = selectedDate.endOf('month').valueOf();

            for (let i = 1; i < moment(startDateMoment).day(); i++) {
                innerEvents.push({
                    date: moment(startDateMoment).subtract(i, 'days').format('YYYY-MM-DD'),
                    isCurrentMonth: false,
                    isSelected: false,
                    events: [],
                });
            }

            while (startDateMoment <= endDateMoment) {
                const foundDateInGroupedData: any[] | null = groupedEvents ? groupedEvents[moment(startDateMoment).format('YYYY-MM-DD')] : null;
                let isToday: boolean = false;
                let isSelected: boolean = false;
                const today = moment();

                if (moment(startDateMoment).format('YYYY-MM-DD') === today.format('YYYY-MM-DD')) {
                    isToday = !isToday;

                    if (!selectedEvent) {
                        isSelected = true;
                    }
                }

                if (foundDateInGroupedData) {
                    const day: Day = {
                        date: moment(startDateMoment).format('YYYY-MM-DD'),
                        isCurrentMonth: true,
                        isToday,
                        isSelected,
                        events: (foundDateInGroupedData as any).map((s: any) => ({
                            id: s.id,
                            projectName: s.projectName,
                            websiteURL: s.websiteURL,
                            description: s.description,
                            datetime: s.dropDateTime,
                            bannerURL: s.bannerURL,
                            profilePicURL: s.profilePicURL,
                            links: {
                                twitterLink: s.links.twitterLink,
                                instagramLink: s.links.instagramLink,
                                etherscanLink: s.links.etherscanLink,
                                discordLink: s.links.discordLink,
                                openSeaLink: s.links.openSeaLink,
                            }
                        }))
                    }

                    innerEvents.push(day);
                } else {
                    innerEvents.push({
                        date: moment(startDateMoment).format('YYYY-MM-DD'),
                        isCurrentMonth: true,
                        isToday,
                        isSelected,
                        events: [],
                    });
                }

                startDateMoment = moment(startDateMoment).add(1, 'days').valueOf();
            }
            for (let i = 1; i < moment(endDateMoment).days(); i++) {
                innerEvents.push({
                    date: moment(endDateMoment).add(i, 'days').format('YYYY-MM-DD'),
                    isCurrentMonth: false,
                    isSelected: false,
                    events: [],
                });
            }
        setEvents(innerEvents);
    }

    function desktopEventSelected(day: Day) {
        const updatedEvents = events.map((e: Day) => {
            let isSelected: boolean = false;
            if (e.date === day.date) {
                isSelected = true;
            }
            return {
                ...e,
                isSelected,
            }
        });
        setEvents(updatedEvents);
        setSelectedEvent(day);
    }

    return (
        <div className={"lg:flex lg:h-full lg:flex-col " + styles['calendar-container']}>
            <header className={`${styles['calendar-header']} relative z-20 flex items-center justify-between border-b py-4 px-6 lg:flex-none`}>
                <h1 className={`text-lg font-semibold ${styles['calendar-current-month']}`}>
                    <time dateTime={selectedDate.format('YYYY-MM')}>{selectedDate.format('MMMM YYYY')}</time>
                </h1>
                <div className="flex items-center">
                    <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                        <button
                            onClick={() => {
                                setSelectedDate(selectedDate.startOf('month').subtract(1, 'month'));
                                getData();
                            }}
                            type="button"
                            className={`${styles['previous-month-button']} flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50`}
                        >
                            <span className={`sr-only ${styles['previous-month-button-text']}`}>Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => {
                                setSelectedDate(moment());
                                getData();
                            }}
                            type="button"
                            className={`${styles['today-button']} hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block`}
                        >
                            Today
                        </button>
                        <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                        <button
                            onClick={() => {
                                setSelectedDate(selectedDate.startOf('month').add(1, 'month'));
                                getData();
                            }}
                            type="button"
                            className={`${styles['next-month-button']} flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50`}
                        >
                            <span className={`sr-only ${styles['next-month-button-text']}`}>Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </header>
            <div className={`${styles['day-row']} shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col`}>
                <div className={`${styles['day-out-div']} pl-3 pr-3 grid grid-cols-7 gap-px border-b text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none`}>
                    <div className={`${styles['day-div']} py-2`}>
                        M<span className="sr-only sm:not-sr-only">on</span>
                    </div>
                    <div className={`${styles['day-div']} py-2`}>
                        T<span className="sr-only sm:not-sr-only">ue</span>
                    </div>
                    <div className={`${styles['day-div']} py-2`}>
                        W<span className="sr-only sm:not-sr-only">ed</span>
                    </div>
                    <div className={`${styles['day-div']} py-2`}>
                        T<span className="sr-only sm:not-sr-only">hu</span>
                    </div>
                    <div className={`${styles['day-div']} py-2`}>
                        F<span className="sr-only sm:not-sr-only">ri</span>
                    </div>
                    <div className={`${styles['day-div']} py-2`}>
                        S<span className="sr-only sm:not-sr-only">at</span>
                    </div>
                    <div className={`${styles['day-div']} py-2`}>
                        S<span className="sr-only sm:not-sr-only">un</span>
                    </div>
                </div>

                <div className={"flex text-xs leading-6 text-gray-700 lg:flex-auto pl-3 pr-3 " + styles['calendar']}>
                    <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-1.5">
                        {events.map((day: Day) => (
                            <button
                                onClick={() => desktopEventSelected(day)}
                                key={day.date}
                                className={`${day.isCurrentMonth ? (day.isToday && day.isSelected ? `${styles['today-cal-col']} text-left pl-2 pr-2 pb-2 pt-2` : (day.isSelected ? `${styles['selected-cal-col']} text-left pl-2 pr-2 pb-2 pt-2` : `${styles['current-cal-col']} text-left pl-2 pr-2 pb-2 pt-2`)) : ('text-gray-500 relative py-2 px-3 ' + styles['cal-col'])}`}
                            >
                                {
                                    day.isCurrentMonth ? <>
                                        <time
                                            dateTime={day.date}
                                            className={
                                                day.isToday
                                                    ? "flex items-center rounded-full font-semibold text-white " + styles['today']
                                                    : styles['not-today']
                                            }
                                        >
                                            {    // @ts-ignore
                                                day.date.split("-").pop().replace(/^0/, "")}
                                        </time>
                                        <div className={'mat-2 md:pt-3 text-white'}>
                                            {
                                                day.events.length > 0 ? <>
                                                    {day.events.length} NFT DROP{day.events.length > 1 ? 'S' : <></>}
                                                </> : <></>
                                            }
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                            </button>
                        ))}
                    </div>
                    <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                        {events.map((day: Day) => (
                            day.isCurrentMonth ?
                            <button
                                key={day.date}
                                type="button"
                                className={classNames(
                                    day.isSelected && day.isToday && styles['mobile-today-col'],
                                    day.isSelected && !day.isToday && styles['selected-mobile-day-col'],
                                    styles['mobile-current-month-col'],
                                    "flex h-22 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10")}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        day.isSelected &&
                                        "flex h-6 w-6 items-center justify-center rounded-full", "ml-auto"
                                    )}
                                >
                                    {    // @ts-ignore
                                        day?.date?.split("-").pop().replace(/^0/, "")}
                                </time>
                                <div className={'mat-2 pt-3 text-white'}>
                                    {
                                        day.events.length > 0 ? <>
                                            {day.events.length} NFT DROP{day.events.length > 1 ? 'S' : <></>}
                                        </> : <></>
                                    }
                                </div>
                            </button>
                                :
                                <div key={day.date} className={'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
