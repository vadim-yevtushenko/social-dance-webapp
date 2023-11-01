import React, { useEffect, useState } from "react";
import { fetchDancers } from "../../api/DancerApi";
import DancersTable from "./DancersTable";
import PaginationComponent from "../pagination/PaginationComponent";
import { useValues } from "../../hooks/useValues";
import { useDispatch, useSelector } from "react-redux";
import DancerSearchComponent from "./DancerSearchComponent";

const DancersComponent = () => {

    const { total } = useSelector(state => state.lists)
    const dispatch = useDispatch();
    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const { dancerPageSizeOptions } = useValues()

    useEffect(() => {
        dispatch(fetchDancers(name, lastName, null, null, page, Number(size)))
    }, [name, lastName, page, size]);

    return (
        <div className="max-w-7xl flex-col grow px-4 sm:px-6 lg:px-8 my-5">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Dancers</h1>
                </div>
                <DancerSearchComponent
                    name={name}
                    setName={setName}
                    lastName={lastName}
                    setLastName={setLastName}
                />
            </div>
            <DancersTable/>
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