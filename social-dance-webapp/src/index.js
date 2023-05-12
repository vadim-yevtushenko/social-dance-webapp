import "./styles/tailwind.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DancerApi from "./api/DancerApi";
import HeaderNavbar from "./components/header/HeaderNavbar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DancerTable from "./components/dancer/DancerTable";
import Pagination from "./components/pagination/Pagination";

const dancerApi = new DancerApi();

// dancerApi.getAllDancers().then(res => console.log(res));
dancerApi.getDancer("7559f0d5-2f3b-4479-a413-46b1abcc87bd").then(res => console.log(res));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div className='flex flex-col h-screen h-full'>
          {/*<Header/>*/}
          <HeaderNavbar/>
          <DancerTable/>
          <Pagination/>
          <Footer/>
      </div>
  </React.StrictMode>
);

