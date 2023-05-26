import './App.css';
import {DancersPage, EventsPage, LoginPage, Page404,
    ProfilePage, RegistrationPage, SchoolsPage} from "./pages";
import {BrowserRouter,Route, Routes} from "react-router-dom";

const App = () => {

  return (
      <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<EventsPage/>}/>
              <Route path="events" element={<EventsPage/>}/>
              <Route path="schools" element={<SchoolsPage/>}/>
              <Route path="dancers" element={<DancersPage/>}/>
              <Route path="profile" element={<ProfilePage/>}/>
              <Route path="login" element={<LoginPage/>}/>
              <Route path="registration" element={<RegistrationPage/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
          </main>
      </BrowserRouter>
  )
}

export default App;
