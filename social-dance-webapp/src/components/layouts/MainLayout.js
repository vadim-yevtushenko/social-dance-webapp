import Footer from "./footer/Footer";
import MainHeader from "./header/MainHeader";

const MainLayout = ({ children }) => {
    return (
        <div className='flex flex-col h-screen z-20 overflow-auto overscroll-contain'>
            <MainHeader/>
            <main className='flex justify-center'>{children}</main>
            <Footer/>
        </div>
    );
};

export default MainLayout;