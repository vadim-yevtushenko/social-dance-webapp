import {useSelector} from "react-redux";

const ProfileComponent = () => {

    const {dancer} = useSelector(state => state.dancer)
    // const {name, lastName, gender, level,
    //     birthday, description, } = dancer
    const isAuthenticated = useSelector(state => state.isAuthenticated)

    console.log("isAuthenticated", isAuthenticated)
    console.log("dancer", dancer)
    return <div>
        <h1 className="text-base font-semibold leading-6 text-gray-900">
            {dancer?.name}<br/>
            {dancer?.lastName}<br/>
            {dancer?.gender}<br/>
            {dancer?.level}<br/>
            {dancer?.birthday}<br/>
            {dancer?.description}<br/>
        </h1>
    </div>
}

export default ProfileComponent