import Review from "../review/Review";
import {StarIcon} from "@heroicons/react/20/solid";
import {classNamesJoin} from "../../util/classNameUtils";

export default function CardContainer( {schools} ) {
    console.log("schools", schools)
    return (
        <ul role="list" className="space-y-3 my-5 mx-10">
            {schools.map((school) => (
                <li key={school.id} className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
                    {school.name} {school.contactInfo && school.contactInfo.city} {school.description}

                    <div className="mt-3 flex items-center">
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

                </li>
            ))}
        </ul>
    )
}