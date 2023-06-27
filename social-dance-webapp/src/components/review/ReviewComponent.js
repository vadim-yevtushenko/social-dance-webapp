import { StarIcon } from '@heroicons/react/20/solid'
import {classNamesJoin} from "../../util/classNameUtils";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReviews} from "../../api/ReviewApi";
import {parseFullDateTimeString} from "../../util/dateTimeUtils";
import {reviewMapper} from "../../util/mapper";
import {useSelector} from "react-redux";
import {POST} from "../../api/Endpoints";
import {useHttp} from "../../hooks/http.hook";
import PaginationComponent from "../pagination/PaginationComponent";
import React from "react";
import {useValues} from "../../hooks/useValues";

export default function ReviewComponent({rerender}) {
    const [loading, setLoading] = useState(false);
    const {isAuthenticated, dancer} = useSelector(state => state.auth)
    const params = useParams();
    const [schoolId, setSchoolId] = useState(params.id)
    const[reviews, setReviews] = useState()
    const[review, setReview] = useState('')
    const[incognito, setIncognito] = useState()
    const[showWriteReview, setShowWriteReview] = useState(false)
    const {request} = useHttp();
    const[page, setPage] = useState(1)
    const[size, setSize] = useState(5)
    const [total, setTotal] = useState();
    const {dancerPageSizeOptions} = useValues()

    useEffect(() => {
        setLoading(true)
        getReviews(schoolId)
            .then(res => {
                console.log("res", res.data)
                setReviews(res.data.results)
                setTotal(res.data.total)
                setLoading(false)
            })
            .catch(error => {
                console.log("error", error)
                setLoading(false);
            })
    }, [showWriteReview, rerender])

    const createReview = () => {
        if (showWriteReview && review.trim() !== ''){
            setLoading(true)
            const newReview = reviewMapper(null, schoolId, dancer.id, review, incognito)
            console.log("newReview", newReview)
            const save = () => request(POST.saveReview(), "POST", JSON.stringify(newReview))
            save()
                .then(res => {
                    console.log(res)
                    setLoading(false);
            })
                .then(() => {
                    setReview('')
                    setShowWriteReview(false)
                })
                .catch(error => {
                    console.log("error", error)
                    setLoading(false);
                })
        }else {
            setShowWriteReview(true)
        }
    }

    return (
        <div>
            <h3 className="sr-only">Recent reviews</h3>
            <div className="mt-0">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Reviews</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Share your thoughts about this school with other dancers
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
                    {reviews?.map((review) => (
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
                            <p className="text-sm italic text-gray-500 mt-3 text-end">{parseFullDateTimeString(review.created)}</p>
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