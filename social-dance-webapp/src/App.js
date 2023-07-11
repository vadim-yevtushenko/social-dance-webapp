import './App.css';
import {
    DancersPage, EventPage, EventsPage, LoginPage, Page404,
    ProfilePage, RegistrationPage, SchoolPage, SchoolsPage
} from "./pages";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import React from "react";
import Spinner from "./components/spinner/Spinner";
import {useSelector} from "react-redux";

const App = () => {
    const { loading } = useSelector(state => state.request)

    return (
      <BrowserRouter>
          {loading && <Spinner/>}
          <main>
            <Routes>
              <Route path="/" element={<EventsPage/>}/>
              <Route path="events">
                  <Route index element={<EventsPage/>}/>
                  <Route path=":id" element={<EventPage/>}/>
              </Route>
              <Route path="schools" >
                  <Route index element={<SchoolsPage/>}/>
                  <Route path=":id" element={<SchoolPage/>}/>
              </Route>
              <Route path="dancers" element={<DancersPage/>}/>
              <Route path="profile" element={<ProfilePage/>}/>
              <Route path="login" element={<LoginPage/>}/>
              <Route path="registration" element={<RegistrationPage/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
          </main>
          <Toaster/>
      </BrowserRouter>
  )
}

export default App;
