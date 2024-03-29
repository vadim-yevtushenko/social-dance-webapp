import { StarIcon } from "@heroicons/react/20/solid";
import { classNamesJoin } from "../../util/classNameUtils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGeneralRating, fetchRating, saveRating } from "../../api/RatingApi";
import { ratingMapper } from "../../util/mapper";
import { useDispatch, useSelector } from "react-redux";
import { useValues } from "../../hooks/useValues";

const RatingComponent = ({ rerender, setRerender, typeOption }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, dancer } = useSelector(state => state.auth)
    const params = useParams();
    const [objectId, setObjectId] = useState(params.id)
    const { generalRating } = useSelector(state => state.feedback)
    const { id, rating } = useSelector(state => state.feedback.rating)
    const [changedRating, setChangedRating] = useState(0)
    const [showRate, setShowRate] = useState(false)
    const { ratingButtons } = useValues()
    const { TYPE_OPTIONS } = useValues()
    const [name, setName] = useState(typeOption === TYPE_OPTIONS.SCHOOL ? "school" : "event")

    useEffect(() => {
        dispatch(fetchGeneralRating(params.id))
    }, [showRate])

    const save = () => {
        if (showRate && changedRating > 0){
            const newRating = ratingMapper(id, objectId, dancer.id, changedRating)
            dispatch(saveRating(newRating))
                .then(() => {
                    setRerender(!rerender)
                    setShowRate(false)
                })
        }else {
            dispatch(fetchRating(objectId, dancer.id))
                .then(() => {
                    setShowRate(true)
                })

        }
    }

    return (
    <>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">{typeOption === TYPE_OPTIONS.SCHOOL ? "School Rating" : "Event Rating for Recommendation"}</h2>
        <div className="mt-3 flex items-center">
            <div>
                <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                            key={rating}
                            className={classNamesJoin(
                                generalRating?.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                        />
                    ))}
                </div>
                <p className="sr-only">{generalRating?.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">Based on {generalRating?.totalCount} ratings</p>
        </div>

        <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
                {generalRating.counts && Object.entries(generalRating?.counts).reverse().map(([rating, count]) => (
                    <div key={rating} className="flex items-center text-sm">
                        <dt className="flex flex-1 items-center">
                            <p className="w-3 font-medium text-gray-900">
                                {rating}
                                <span className="sr-only"> star reviews</span>
                            </p>
                            <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                                <StarIcon
                                    className={classNamesJoin(
                                        count > 0 ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />

                                <div className="relative ml-3 flex-1">
                                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                    {count > 0 ? (
                                        <div
                                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                            style={{ width: `calc(${count} / ${generalRating?.totalCount} * 100%)` }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </dt>

                        <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            {generalRating?.totalCount ? Math.round((count / generalRating.totalCount) * 100) : 0}%
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
        <div className="mt-2 flex-col">
            {isAuthenticated ? (
                <>
                    <button
                        className={classNamesJoin(showRate ?
                                "text-white bg-indigo-500 hover:bg-indigo-600" : "text-gray-900 bg-white hover:bg-gray-50",
                            "flex mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-8 py-2 text-sm font-medium sm:w-auto lg:w-full"
                        )}
                        onClick={() => save()}
                    >
                        {showRate ? "Save rating" : "Rate the " + name}
                    </button>
                    {showRate && (
                        <>
                            <p className="mt-1 text-sm text-gray-600">
                                {id != null ? "You have already rated this " + name + ", but you can change your rating."
                                    : "You have not rated this " + name + " yet. Please rate if you have reason."}
                            </p>
                            <div className="flex mt-2 justify-center">
                                <fieldset className="mt-2">
                                    <legend className="sr-only">Notification method</legend>
                                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-6 sm:space-y-0">
                                        {ratingButtons.map((button) => (
                                            <div key={button.id} className="flex items-center">
                                                <input
                                                    id={button.id}
                                                    name="notification-method"
                                                    type="radio"
                                                    defaultChecked={button.id === String(rating)}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={button.id}
                                                    onClick={event => setChangedRating(event.target.value)}
                                                />
                                                <label htmlFor={button.id} className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                                                    {button.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <p className="mt-3 text-sm flex justify-center text-gray-600">
                    If you want to rate the {name}, please log in!
                </p>
            )}
        </div>
    </>
)}

export default RatingComponent