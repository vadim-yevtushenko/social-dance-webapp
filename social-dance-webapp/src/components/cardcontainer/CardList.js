import {parseFullDateTimeString} from "../../util/dateTimeUtils";
import {getFullAddress} from "../../util/addressUtils";

export default function CardList({events}) {
    console.log("events", events)
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Events</h2>

                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                            <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96">
                                <img
                                    src={"https://thumbs.dreamstime.com/b/sherlock-holmes-concept-private-detective-tools-wood-tab-table-background-deerstalker-cap-old-key-book-tobacco-pipe-65190425.jpg"}
                                    alt={event.name}
                                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                />
                            </div>
                            <div className="flex flex-1 flex-col space-y-2 p-4">
                                <div className="flex justify-between">
                                    <h3 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 flex">
                                        <a href={"/dancers"}>
                                            <span aria-hidden="true" className="inset-0" />
                                            {event.name}
                                        </a>
                                    </h3>
                                    <button
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold
                                                    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                                                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Join
                                    </button>
                                </div>
                                <p className="text-sm italic text-gray-500">{event.contactInfo && getFullAddress(event.contactInfo)}</p>
                                <p className="text-sm text-gray-500">{event.description}</p>
                                <div className="flex flex-1 flex-col justify-end">
                                    <p className="text-base font-medium text-gray-900">Start: {parseFullDateTimeString(event.dateEvent)}</p>
                                    <p className="text-base font-medium text-gray-900">Finish: {parseFullDateTimeString(event.dateFinishEvent)}</p>
                                    <p className="text-sm italic text-gray-500 mt-5 text-end">{parseFullDateTimeString(event.created)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}