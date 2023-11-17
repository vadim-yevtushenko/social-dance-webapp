import DialogComponent from "../../../modals/DialogComponent";
import CheckboxElement from "../../../forms/elements/CheckboxElement";
import React from "react";

const ManageDanceListComponent = ({ dances, setDancesList, openDialog, setOpenDialog }) => {

    return (
        <>
            <div className="flex justify-between">
                <label htmlFor="about" className="block text-md font-medium leading-6 text-black">
                    Dances
                </label>
                <a
                    className="text-sm font-medium text-indigo-700 hover:text-indigo-500 cursor-pointer"
                    onClick={() => setOpenDialog(true)}
                >
                    {dances?.length > 0 ? "change dances list" : "add dances"}
                </a>
            </div>

            <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list" className="columns-2">
                    {dances?.map((dance) => (
                        <li key={dance.id}>{dance.name}</li>
                    ))}
                </ul>
            </div>
            <DialogComponent openDialog={openDialog} setOpenDialog={setOpenDialog}>
                <div className="flex-col w-2/3">
                    <CheckboxElement
                        label={"Dances"}
                        checkedDances={dances?.map(dance => dance.name)}
                        setDances={setDancesList}
                    />
                </div>
            </DialogComponent>
        </>
    )
}

export default ManageDanceListComponent