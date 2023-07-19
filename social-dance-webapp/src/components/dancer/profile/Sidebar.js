import { classNamesJoin } from "../../../util/classNameUtils";
import { Cog6ToothIcon, FolderIcon, GlobeAltIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const chapterData = [
    { id: 'PERSONAL_INFO', name: 'Personal Information', href: '#', icon: FolderIcon, current: true },
    { id: 'MY_SCHOOLS', name: 'My schools', href: '#', icon: BuildingOffice2Icon, current: false },
    { id: 'MY_EVENTS', name: 'My events', href: '#', icon: GlobeAltIcon, current: false },
    { id: 'SETTINGS', name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]

const Sidebar = ({ onChange }) => {
    const [chapters, serChapters] = useState(chapterData)

    const handleChangeChapter = (currentChapter) => {
        serChapters(chapters.map((chapter) => {
            if (chapter.id === currentChapter.id){
                return {...chapter, current: true}
            }else {
                return {...chapter, current: false}
            }
        }))

        onChange(currentChapter.id)
    }

    return <>
        <header className="xl:hidden border-b border-white/5">
            {/* Secondary navigation */}
            <nav className="flex overflow-x-auto py-4">
                <ul
                    role="list"
                    className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                    {chapters.map((chapter) => (
                        <li key={chapter.name}>
                            <a
                                href={chapter.href}
                                className={chapter.current && 'text-indigo-400'}
                                onClick={() => handleChangeChapter(chapter)}
                            >
                                {chapter.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
        {/*Static sidebar for desktop*/}
        <div className="hidden xl:z-50 xl:flex xl:w-72 xl:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pt-3 ring-1 ring-white/5">
                <nav className="flex flex-1 flex-col">

                    <ul role="list" className="-mx-2 space-y-1">
                        {chapters.map((chapter) => (
                            <li
                                key={chapter.id}
                                onClick={() => handleChangeChapter(chapter)}
                            >
                                <a
                                    href={chapter.href}
                                    className={classNamesJoin(
                                        chapter.current
                                            ? 'bg-gray-800 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <chapter.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {chapter.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                </nav>
            </div>
        </div>

    </>
}

export default Sidebar