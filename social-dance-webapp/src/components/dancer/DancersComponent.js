import React, {useEffect, useState} from "react";
import {getDancers} from "../../api/DancerApi";
import DancerTable from "./DancerTable";
import PaginationComponent from "../pagination/PaginationComponent";
import Spinner from "../spinner/Spinner";
import {useValues} from "../../hooks/useValues";

const DancersComponent = () => {

    const [dancers, setDancers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const {dancerPageSizeOptions} = useValues()

    useEffect(() => {
        setLoading(true);
        getDancers(page, Number(size))
            .then(res => {
                setDancers(res.data.results);
                setTotal(res.data.total)
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
            <PaginationComponent
                page={page}
                size={size}
                total={total}
                setPage={setPage}
                setSize={setSize}
                pageSizeOptions={dancerPageSizeOptions}
            />
        </div>
    );
}

export default DancersComponent