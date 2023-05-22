import React, {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import {getEvents} from "../../api/EventApi";
import CardContainer from "../cardcontainer/CardContainer";
import CardList from "../cardcontainer/CardList";

const EventsComponent = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);

    useEffect(() => {
        setLoading(true);
        getEvents(page, size)
            .then(res => {
                setEvents(res.results);
                setTotal(res.total)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log("error", error)
            });
    }, [page, size]);

    if (loading){
        return (
            <div className="min-h-full flex items-center">
                <Spinner/>
            </div>
        )
    }

    return (
        <div>
            <CardList events={events}/>
        </div>
    )
}

export default EventsComponent