import React, {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import {getSchools} from "../../api/SchoolApi";
import CardList from "../cardcontainer/CardList";
import CardContainer from "../cardcontainer/CardContainer";

const SchoolsComponent = () => {

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);

    useEffect(() => {
        setLoading(true);
        getSchools(page, size)
            .then(res => {
                console.log("res", res)
                setSchools(res.results);
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
            <CardContainer schools={schools}/>
        </div>
    )
}

export default SchoolsComponent