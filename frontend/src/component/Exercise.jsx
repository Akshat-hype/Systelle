import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Navbar from './Navbar';

const levels = [
  {
    title: "Beginner Level Exercise",
    days: [
      { day: "DAY 1", label: "Warm up & Streaching", locked: false },
      { day: "DAY 2", label: "Light Cardio", locked: true },
      { day: "DAY 3", label: "Yoga Basics", locked: true },
      { day: "DAY 4", label: "Running", locked: true },
    ],
  },
  {
    title: "Mediator Level Exercise",
    days: [
      { day: "DAY 1", label: "Warm up & Streaching", locked: false },
      { day: "DAY 2", label: "Light Cardio", locked: true },
      { day: "DAY 3", label: "Yoga Basics", locked: true },
      { day: "DAY 4", label: "Running", locked: true },
    ],
  },
  {
    title: "Advanced Level Exercise",
    days: [
      { day: "DAY 1", label: "Warm up & Streaching", locked: false },
      { day: "DAY 2", label: "Light Cardio", locked: true },
      { day: "DAY 3", label: "Yoga Basics", locked: true },
      { day: "DAY 4", label: "Running", locked: true },
    ],
  },
];

const Exercise = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
      fetch('http://localhost:5000/exercise', {
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
    <div className="py-10 bg-[url(/base2.jpg)] bg-cover bg-center bg-fixed min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Exercise Section */}
      <div className="mt-10 flex items-center justify-center px-4">
        <div className="bg-white/50 max-w-[85%] backdrop-blur-md shadow-xl rounded-2xl p-4 sm:p-6 w-full space-y-6">
          {levels.map((level, index) => (
            <div
              key={index}
              className="rounded-xl border border-transparent bg-white/50 px-2 sm:px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border hover:border-purple-400 shadow-sm"
            >
              <h2 className="font-bold text-2xl text-gray-800 mb-4 px-2">
                {level.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {level.days.map((day, idx) => {
                  const isBeginnerDay1 = !day.locked && level.title === "Beginner Level Exercise" && day.day === "DAY 1";

                  return isBeginnerDay1 ? (
                    <Link to="/exercise/workout" key={idx}>
                      <div className="flex flex-col items-center justify-center px-3 py-3 border rounded-full w-full transform transition duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer bg-white">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                          {day.day}
                        </div>
                        <div className="text-xs text-gray-600">{day.label}</div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={idx}
                      className={`flex flex-col items-center justify-center px-3 py-3 border rounded-full w-full transform transition duration-300 ${
                        day.locked
                          ? 'bg-gray-200 cursor-not-allowed'
                          : 'hover:-translate-y-2 hover:shadow-lg cursor-pointer bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        {day.locked && (
                          <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                            🔒
                          </span>
                        )}
                        {day.day}
                      </div>
                      <div className="text-xs text-gray-600">{day.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercise;