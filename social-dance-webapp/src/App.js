import './App.css';
import { DancersPage, EventsPage, SchoolsPage } from "./pages";
import {BrowserRouter,Route, Link, Routes} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Page404 from "./pages/404";

const App = () => {

  return (
      <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<EventsPage/>}/>
              <Route path="events" element={<EventsPage/>}/>
              <Route path="schools" element={<SchoolsPage/>}/>>
              <Route path="dancers" element={<DancersPage/>}/>>
              <Route path="*" element={<Page404/>}/>>
            </Routes>
          </main>
      </BrowserRouter>
  )
}

export default App;
