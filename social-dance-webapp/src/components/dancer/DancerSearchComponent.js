import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { classNamesJoin } from "../../util/classNameUtils";

const DancerSearchComponent = ({ name, setName, lastName, setLastName }) => {

    return (
        <>
            <div className="flex flex-1 justify-center lg:ml-6 lg:justify-end my-1 sm:my-0">
                <div className="w-full max-w-lg ">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            className={classNamesJoin(name ? "bg-white" : "bg-gray-700", "block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-800 " +
                                "placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6")}
                            placeholder="Name"
                            type="search"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-1 justify-center lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg ">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="lastName"
                            name="lastName"
                            className={classNamesJoin(lastName ? "bg-white" : "bg-gray-700", "block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-800 " +
                                "placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6")}
                            placeholder="Last name"
                            type="search"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DancerSearchComponent