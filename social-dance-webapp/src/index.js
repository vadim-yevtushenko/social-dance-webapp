import "./styles/tailwind.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainLayout from "./components/layouts/MainLayout";
import DancersComponent from "./components/dancer/DancersComponent";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <MainLayout>
          <DancersComponent/>
      </MainLayout>
  </>
);

