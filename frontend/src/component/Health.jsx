import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Navbar from './Navbar';
const isactive = 'bg-gradient-to-r from-pink-100 to-indigo-200 pl-5 pr-5 rounded-full max-h-14 my-auto';
const inactive = 'hover:bg-indigo-50 hover:shadow-lg rounded-full pr-5 pl-5 max-h-10 my-auto hover:scale-105 transition delay-100 duration-200 ease-in-out';

const Health = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
          fetch('http://localhost:5000/health', {
              method: 'GET',
              credentials: 'include'
          })
          .then(res => {
              if (res.status === 401) {
                  window.location.replace('/login');
              }
          });
      }, []);
  return (
    <div className="py-10 bg-[url(/base2.jpg)] bg-cover bg-center min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* About Your Period Section */}
      <div className='mx-auto mt-5 bg-white/60 p-5 shadow-md rounded-2xl max-w-[85%]'>
      <div className="flex items-center pb-8">
      <div className="flex-grow h-1 mr-4 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
        <h2 className="text-center text-2xl font-bold">About Your Period</h2>
        <div className="flex-grow h-1 ml-4 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
        </div>
        <div className="flex justify-around flex-wrap gap-5">
         
          <Link to="/health/BloodAmount" className="flex flex-col items-center bg-white/60 p-4 rounded-2xl w-70 shadow hover:scale-105 transition cursor-pointer">
            <img src="img1.png" alt="Normal Flow" className="w-70 h-52 rounded-lg" />
            <button className="text-lg font-medium pt-2">How much period blood is normal?</button>
          </Link>

          <Link to="/health/PeriodColor" className="flex flex-col items-center bg-white/60 p-4 rounded-2xl w-70 shadow hover:scale-105 transition cursor-pointer">
            <img src="img2.png" alt="Color Meaning" className="w-70 h-52 rounded-lg" />
            <button className="text-lg font-medium pt-2">What does my period color mean?</button>
          </Link>

          <Link to="/health/PeriodPain" className="flex flex-col items-center bg-white/60 p-4 rounded-2xl w-70 shadow hover:scale-105 transition">
            <img src="img3.png" alt="Pain" className="w-52 h-52 rounded-lg" />
            <button className="text-lg font-medium pt-2">Why does it pain during periods?</button>
          </Link>

        </div>
      </div>

      {/* Health Tips Section */}
      <div className='p-5 shadow-md rounded-2xl max-w-[85%] mx-auto mt-5 bg-white/60'>
      <div className="flex items-center pb-8">
      <div className="flex-grow h-1 mr-4 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
        <h2 className="text-center text-2xl font-bold">Health Tips</h2>
        <div className="flex-grow h-1 ml-4 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
        </div>
        <div className="flex flex-col gap-6">

          <Link to="/health/CrampRelief" className="overflow-hidden rounded-xl shadow-md hover:scale-[1.01] transition bg-white cursor-pointer">
            <img src="pain.png" alt="Reduce Cramps" className="w-full h-60" />
            <div className="text-lg font-medium m-4">How to reduce period cramps?</div>
          </Link>

          <Link to="/health/Food" className="overflow-hidden rounded-xl shadow-md hover:scale-[1.01] transition bg-white cursor-pointer">
            <img src="food.jpg" alt="Healthy Foods" className="w-full h-60" />
            <div className="text-lg font-medium p-4">Top 10 foods that help with period cramps</div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Health;