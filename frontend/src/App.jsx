import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Menu from "./component/Menu";
import DailyUpdate from "./component/DailyUpdate";
import Calendar from "./component/Calendar";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Signup from "./component/Signup";
import Updateform from "./component/Updateform";
import Health from "./component/Health";
import Homepage from "./component/Homepage";
import Exercise from "./component/Exercise";
import AboutUs from "./component/AboutUs";
import Help from "./component/Help";
import LandingPage from "./component/LandingPage";
import BloodAmount from "./component/BloodAmount";
import PeriodColor from "./component/PeriodColor";
import PeriodPain from "./component/PeriodPain";
import CrampRelief from "./component/CrampRelief";
import Food from "./component/Food";
import Workout from "./component/Workout";

const App=()=>{
  return <><BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signup/form" element={<Updateform />}/>
      <Route path="/home" element={<Homepage/>}/>
      <Route path="/calendar/updates" element={<DailyUpdate />}/>
      <Route path="/calendar" element={<Calendar />}/>
      <Route path="/home/profile" element={<Profile />}/>
      <Route path="/health" element={<Health/>}/>
      <Route path="/exercise" element={<Exercise/>}/>
      <Route path="/home/aboutus" element={<AboutUs/>}/>
      <Route path="/home/help" element={<Help/>}/>
      <Route path="/health/BloodAmount" element={<BloodAmount />} />
      <Route path="/health/PeriodColor" element={<PeriodColor />} />
      <Route path="/health/PeriodPain" element={<PeriodPain />} />
      <Route path="/health/CrampRelief" element={<CrampRelief />} />
      <Route path="/health/Food" element={<Food />} />
      <Route path="/exercise/Workout" element={<Workout />} />
    </Routes>
    </BrowserRouter>
    </>
}
export default App;