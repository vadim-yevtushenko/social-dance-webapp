import { useState } from "react";
import ModalConfirmDeletion from "../../../modals/ModalConfirmDeletion";

const DeletingBlock = ({ title, subTitle, buttonName, action }) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <ModalConfirmDeletion
                open={openModal}
                setOpen={setOpenModal}
                title={title}
                action={action}
            />
            <div>
                <h2 className="text-base font-semibold leading-7 text-black">Delete {title}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                    {subTitle}
                </p>
            </div>

            <div className="md:col-span-2">
                <button
                    type="button"
                    className="rounded-md bg-red-500 mt-8 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                    onClick={() => setOpenModal(true)}
                >
                    {buttonName}
                </button>
            </div>
        </>
    )
}

export default DeletingBlock