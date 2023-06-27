import MainLayout from "../components/layouts/MainLayout";
import {useValues} from "../hooks/useValues";
import EventsOrSchoolsComponent from "../components/events-schools/EventsOrSchoolsComponent";

const SchoolsPage = () => {
    const { TYPE_OPTIONS } = useValues()

    return  <>
        <MainLayout>
            <EventsOrSchoolsComponent typeOption={TYPE_OPTIONS.SCHOOL}/>
        </MainLayout>
    </>
}

export default SchoolsPage