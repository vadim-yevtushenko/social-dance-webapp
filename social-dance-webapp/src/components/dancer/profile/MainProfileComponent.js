import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import InfoProfileComponent from "./InfoProfileComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MySchoolsProfileComponent from "./MySchoolsProfileComponent";
import MyEventsProfileComponent from "./MyEventsProfileComponent";
import SettingsProfileComponent from "./SettingsProfileComponent";

const CHAPTER = {
    PERSONAL_INFO: "PERSONAL_INFO",
    MY_SCHOOLS: "MY_SCHOOLS",
    MY_EVENTS: "MY_EVENTS",
    SETTINGS: "SETTINGS"
}

const MainProfileComponent = () => {

    const navigate = useNavigate()
    const { isAuthenticated } = useSelector(state => state.auth)
    const [currentChapter, setCurrentChapter] = useState(CHAPTER.PERSONAL_INFO)

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/login")
        }
    },[isAuthenticated])

    const renderChapter = () => {
        switch (currentChapter) {
            case CHAPTER.PERSONAL_INFO:
                return <InfoProfileComponent/>
            case CHAPTER.MY_SCHOOLS:
                return <MySchoolsProfileComponent/>
            case CHAPTER.MY_EVENTS:
                return <MyEventsProfileComponent/>
            case CHAPTER.SETTINGS:
                return <SettingsProfileComponent/>
        }
    }

    return (
        <div className="grow xl:flex min-h-screen">
            <Sidebar
                onChange={chapter => setCurrentChapter(chapter)}
            />
            {renderChapter()}
        </div>
    )
}

export default MainProfileComponent