import EventsOrSchoolsComponent from "../components/events-schools/EventsOrSchoolsComponent";
import MainLayout from "../components/layouts/MainLayout";
import { useValues } from "../hooks/useValues";

const EventsPage = () => {
    const { TYPE_OPTIONS } = useValues()

    return <>
        <MainLayout>
            <EventsOrSchoolsComponent typeOption={TYPE_OPTIONS.EVENT}/>
        </MainLayout>
    </>
}

export default EventsPage