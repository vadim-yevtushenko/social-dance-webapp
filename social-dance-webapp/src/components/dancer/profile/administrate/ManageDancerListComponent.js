import DialogComponent from "../../../modals/DialogComponent";
import EditEventOrganizersForm from "./EditEventOrganizersForm";
import React from "react";
import { useValues } from "../../../../hooks/useValues";
import EditSchoolAdministratorsForm from "./EditSchoolAdministratorsForm";

const ManageDancerListComponent = ({ type, dancerList, setDancerList, openDialog, setOpenDialog }) => {

    const { TYPE_OPTIONS } = useValues()

    return (
        <>
            <div className="flex justify-between">
                <label htmlFor="about" className="block text-md font-medium leading-6 text-black">
                    {TYPE_OPTIONS.EVENT === type ? "Organizers" : "Administrators"}
                </label>
                <a
                    className="text-sm font-medium text-indigo-700 hover:text-indigo-500 cursor-pointer"
                    onClick={() => setOpenDialog(true)}
                >
                    {TYPE_OPTIONS.EVENT === type ? "edit organizers" : "edit administrators"}
                </a>
            </div>
            <div className="prose prose-sm mt-4 text-gray-800">
                <ul role="list" className="columns-2">
                    {dancerList !== undefined && dancerList?.map((dancer) => (
                        <li key={dancer.id}>
                            {dancer.name} {dancer.lastName}
                        </li>
                    ))}
                </ul>
            </div>
            <DialogComponent openDialog={openDialog} setOpenDialog={setOpenDialog}>
                <div className="flex-col w-4/5">
                    {TYPE_OPTIONS.EVENT === type ? (
                        <EditEventOrganizersForm
                            organizers={dancerList}
                            setOrganizers={setDancerList}
                        />
                    ) : (
                        <EditSchoolAdministratorsForm
                            administrators={dancerList}
                            setAdministrators={setDancerList}
                        />
                    )}
                </div>
            </DialogComponent>
        </>
    )
}

export default ManageDancerListComponent