import Header from "../header/Header";
import Footer from "../footer/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className='flex flex-col h-screen z-20 overflow-auto'>
            <Header/>
            <main className='flex-grow'>{children}</main>
            <Footer/>
        </div>
    );
};

export default MainLayout;