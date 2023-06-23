import MainLayout from "../components/layouts/MainLayout";
import OverViewComponent from "../components/page/OverViewComponent";
import {useValues} from "../hooks/useValues";

const SchoolPage = () => {
    const { TYPE_OPTIONS } = useValues()

    return  <>
        <MainLayout>
            <OverViewComponent typeOption={TYPE_OPTIONS.SCHOOL}/>
        </MainLayout>
    </>
}

export default SchoolPage