import {PhotoIcon, StarIcon} from "@heroicons/react/20/solid";
import {classNamesJoin} from "../../util/classNameUtils";

export default function CardContainerDeprecated({schools} ) {


    return (
        <ul role="list" className="space-y-3 my-5 mx-10">
            {schools.map((school) => (
                <li key={school.id} className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
                    <div className="flex ">
                        <div className="flex max-w-xs justify-center rounded-lg border border-1 border-gray-900 px-3 py-3 shadow-md mr-10">
                            <div className="text-center">
                                {!school.image ? (
                                    <img
                                        src={"https://thumbs.dreamstime.com/b/sherlock-holmes-concept-private-detective-tools-wood-tab-table-background-deerstalker-cap-old-key-book-tobacco-pipe-65190425.jpg"}
                                        alt={school.name}
                                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                    />
                                ) : (
                                    <PhotoIcon className="mx-auto h-20 w-20 text-gray-300" aria-hidden="true" />
                                )}
                            </div>
                        </div>

                        <div className="flex-col h-full content-around ">
                            <div className="flex text-4xl font-bold my-5">
                                {school.name}
                            </div>
                            <div className="flex text-lg mb-5">
                                country: {school.contactInfo?.country} {"   "} city: {school.contactInfo?.city} {"   "} street: {school.contactInfo?.street} {"   "} building: {school.contactInfo?.building}
                            </div>
                            <div className="flex-col text-lg mb-5">
                                {school.contactInfo?.email}
                                {school.contactInfo?.phoneNumber}
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNamesJoin(
                                                    4 > rating ? 'text-yellow-400' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only"> out of 5 stars</p>
                                </div>
                                <p className="ml-2 text-sm text-gray-900">Based on  reviews</p>
                            </div>
                        </div>

                    </div>
                </li>
            ))}
        </ul>
    )
}