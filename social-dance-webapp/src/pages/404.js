import { Link } from "react-router-dom";
import logo from '../logo.svg';
import MainLayout from "../components/layouts/MainLayout";

const Page404 = () => {
        return (
            <div>
                <MainLayout>
                    <div className="grow my-12">
                        <div className='flex-shrink-0 flex justify-center my-12'>
                            <a href='/' className='inline-flex'>
                                <span className='sr-only'>GBG</span>
                                <img className='h-12 w-auto' src={logo} alt='404' />
                            </a>
                        </div>
                        <p
                            className='text-center font-bold text-2xl mb-10'
                        >
                            Page doesn't exist
                        </p>
                        <Link
                            className='block text-center font-bold text-2xl mt-5 hover mb-12 text-blue-700 hover:text-blue-500'
                            to="/"
                        >
                            Back to main page
                        </Link>
                    </div>
                </MainLayout>
            </div>
        )
    }

    export default Page404;