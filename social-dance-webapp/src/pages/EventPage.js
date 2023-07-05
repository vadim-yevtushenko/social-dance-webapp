import MainLayout from "../components/layouts/MainLayout";
import OverViewComponent from "../components/events-schools/OverViewComponent";
import {useValues} from "../hooks/useValues";

const EventPage = () => {
    const { TYPE_OPTIONS } = useValues()

    return <>
        <MainLayout>
            <OverViewComponent typeOption={TYPE_OPTIONS.EVENT}/>
        </MainLayout>
    </>
}

export default EventPage