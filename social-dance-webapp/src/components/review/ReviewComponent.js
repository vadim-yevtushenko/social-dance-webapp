import { StarIcon } from '@heroicons/react/20/solid'
import { classNamesJoin } from "../../util/classNameUtils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {deleteReview, fetchReviews, saveReview} from "../../api/ReviewApi";
import { parseFullDateTimeString } from "../../util/dateTimeUtils";
import { reviewMapper } from "../../util/mapper";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../pagination/PaginationComponent";
import React from "react";
import { useValues } from "../../hooks/useValues";

export default function ReviewComponent({ rerender, typeOption }) {
    const dispatch = useDispatch();
    const { isAuthenticated, dancer } = useSelector(state => state.auth)
    const { results, total } = useSelector(state => state.feedback.reviews)
    const params = useParams();
    const[review, setReview] = useState('')
    const[incognito, setIncognito] = useState()
    const[showWriteReview, setShowWriteReview] = useState(false)
    const[page, setPage] = useState(1)
    const[size, setSize] = useState(5)
    const[localRerender, setLocalRerender] = useState(false)
    const { dancerPageSizeOptions } = useValues()
    const { TYPE_OPTIONS } = useValues()

    useEffect(() => {
        dispatch(fetchReviews(objectId(), page, size))
    }, [showWriteReview, rerender, page, size, localRerender])

    const objectId = () => params.id

    const createReview = () => {
        if (showWriteReview && review.trim() !== ''){
            const newReview = reviewMapper(null, objectId(), dancer.id, review, incognito)
            dispatch(saveReview(newReview))
                .then(() => {
                    setReview('')
                    setShowWriteReview(false)
                })

        }else {
            setShowWriteReview(true)
        }
    }

    const removeReview = (reviewId) => {
        dispatch(deleteReview(reviewId))
            .then(() => setLocalRerender(!localRerender))
    }

    return (
        <div>
            <h3 className="sr-only">Recent reviews</h3>
            <div className="mt-0">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Reviews</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Share your thoughts about this {typeOption === TYPE_OPTIONS.SCHOOL ? "school": "upcoming event"} with other dancers
                </p>
                {isAuthenticated ? (
                    <>
                        {showWriteReview && (
                            <div>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block mt-2 w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={event => setReview(event.target.value)}
                                />
                                <div className="mt-2 flex h-6 items-center">
                                    <input
                                        id="1"
                                        name="incognito"
                                        type="checkbox"
                                        checked={incognito}
                                        onChange={(event) => setIncognito(!incognito)}
                                        className="h-5 w-5 rounded border-gray-400 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <p className="ml-3 text-sm text-gray-600">
                                        - incognito mode
                                    </p>
                                </div>
                            </div>
                        )}
                        <button
                            className={classNamesJoin(showWriteReview ?
                                    "text-white bg-indigo-500 hover:bg-indigo-600" : "text-gray-900 bg-white hover:bg-gray-50",
                                "mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-8 py-2 text-sm font-medium sm:w-auto lg:w-full"
                            )}
                            onClick={() => createReview()}
                        >
                            Write a review
                        </button>
                    </>
                ) : (
                    <p className="mt-1 text-sm text-gray-600">
                        If you want to write a review, please log in!
                    </p>
                )}
            </div>

            <div className="flow-root">
                <div className="my-12 pt-3 border-t divide-y divide-gray-200">
                    {results?.map((review) => (
                        <div
                            key={review.id}
                            className="py-2"
                        >
                            <div className="flex items-center">
                                <img
                                    src={review.dancerContainer?.image !== null && review.dancerContainer?.image !== "" && !review.incognito
                                        ? review.dancerContainer.image
                                        : "/images/avatar-default/avatar_default_icon.png"}
                                    alt={`${review.dancerContainer.name}.`}
                                    className="h-12 w-12 rounded-full" />
                                <div className="ml-4">
                                    {!review.incognito ? (
                                        <>
                                            <h4 className="text-sm font-bold text-gray-900">{review.dancerContainer.name} {review.dancerContainer.lastName}</h4>
                                            <div className="mt-1 flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNamesJoin(
                                                            review.rating.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                        </>

                                    ) : (
                                        <h4 className="text-sm font-bold text-gray-900">Incognito Dancer</h4>
                                        )}

                                    <p className="sr-only">{review.rating.rating} out of 5 stars</p>
                                </div>
                            </div>

                            <div
                                className="mt-4 space-y-6 text-base italic text-gray-600"
                                dangerouslySetInnerHTML={{ __html: review.review }}
                            />
                            <div className="flex justify-between">
                                <p
                                    className="text-red-600 hover:text-red-400 cursor-pointer text-sm italic mt-3"
                                    onClick={() => removeReview(review.id)}
                                >
                                    {dancer.id === review.dancerId && "Delete review"}
                                </p>
                                <p className="text-sm italic text-gray-500 mt-3 text-end">{parseFullDateTimeString(review.created)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {total > 5 && (
                    <PaginationComponent
                        page={page}
                        size={size}
                        total={total}
                        setPage={setPage}
                        setSize={setSize}
                        pageSizeOptions={dancerPageSizeOptions}
                        shortMode={true}
                    />
                )}
            </div>
        </div>

    )
}