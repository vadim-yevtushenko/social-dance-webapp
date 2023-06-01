import React, {useEffect, useState} from "react";
import {getDancers} from "../../api/DancerApi";
import DancerTable from "./DancerTable";
import Pagination from "../pagination/Pagination";
import Spinner from "../spinner/Spinner";
import {useSelector} from "react-redux";

const DancersComponent = () => {

    const [dancers, setDancers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);

    useEffect(() => {
        setLoading(true);
        getDancers(page, Number(size))
            .then(res => {
                setDancers(res.results);
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
            <DancerTable dancers={dancers}/>
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