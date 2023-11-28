import MainLayout from "../components/layouts/MainLayout";

const HomePage = () => {
    return (
        <>
            <MainLayout>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
                    <h1 className="text-5xl italic font-bold text-center py-12">
                        WELCOME<br/><br/>TO<br/><br/>SOCIAL DANCES WEBAPP
                    </h1>
                </div>
            </MainLayout>
        </>
    )
}

export default HomePage