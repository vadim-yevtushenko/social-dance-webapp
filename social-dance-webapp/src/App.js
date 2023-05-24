import './App.css';
import {DancersPage, EventsPage, LoginPage, Page404, SchoolsPage} from "./pages";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import RegistrationForm from "./components/forms/RegistrationForm";

const App = () => {

  return (
      <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<EventsPage/>}/>
              <Route path="events" element={<EventsPage/>}/>
              <Route path="schools" element={<SchoolsPage/>}/>
              <Route path="dancers" element={<DancersPage/>}/>
                <Route path="login" element={<LoginPage/>}>

                </Route>
                <Route path="registration" element={<RegistrationForm/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
          </main>
      </BrowserRouter>
  )
}

export default App;
