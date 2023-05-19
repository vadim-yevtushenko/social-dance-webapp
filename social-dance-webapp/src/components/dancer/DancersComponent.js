import React, {useEffect, useState} from "react";
import {getDancers} from "../../api/DancerApi";
import DancerTable from "./DancerTable";
import Pagination from "../pagination/Pagination";
import LoadingSpinner from "../spinner/LoadingSpinner";
import Spinner from "../spinner/Spinner";

const DancersComponent = () => {

    const [dancerList, setDancerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    console.log("dancers", dancerList)
    useEffect(() => {
        console.log("useEffect")
        setLoading(true);
        getDancers(page, size)
            .then(res => {
                setDancerList(res.results);
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
            <DancerTable dancers={dancerList}/>
            <Pagination
                page={page}
                size={size}
                total={total}
                setPage={setPage}
                setSize={setSize}
            />
        </div>
    );
}

export default DancersComponent