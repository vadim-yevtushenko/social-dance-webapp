import React, {useEffect, useState} from "react";
import {getDancers} from "../../api/DancerApi";
import DancerTable from "./DancerTable";
import Pagination from "../pagination/Pagination";
import LoadingSpinner from "../spinner/LoadingSpinner";
import Spinner from "../spinner/Spinner";

const DancersComponent = () => {

    const [dancerList, setDancerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState();
    const [offset, setOffset] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        getDancers(offset, size)
            .then(res => {
                setDancerList(res.results);
                setTotal(res.total)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log("error", error)
            });
        ;
    }, []);

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
                offset={offset}
                size={dancerList.length < size ? dancerList.length : size}
                total={total}
                setOffset={setOffset}
                setSize={setSize}
            />
        </div>
    );
}

export default DancersComponent