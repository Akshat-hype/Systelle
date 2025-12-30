import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Navbar from "./Navbar";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const isactive =
  "bg-gradient-to-r from-pink-100 to-indigo-200 pl-5 pr-5 rounded-full max-h-14 my-auto";
const inactive =
  "hover:bg-indigo-50 hover:shadow-lg rounded-full pr-5 pl-5 max-h-10 my-auto hover:scale-105 transition delay-100 duration-200 ease-in-out";

export default function Calendar() {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDates, setSelectedDates] = useState([]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weeks = [];
  let day = startDate;
  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  }

  const toggleDate = (d) => {
    setSelectedDates((prev) => {
      const exists = prev.find((pd) => isSameDay(pd, d));
      if (exists) return prev.filter((pd) => !isSameDay(pd, d));
      return [...prev, d];
    });
  };

  const isSelected = (d) => selectedDates.some((pd) => isSameDay(pd, d));

  useEffect(() => {
    fetch("http://localhost:5000/calendar", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 401) window.location.replace("/login");
    });
  }, []);

  return (
    <div className="bg-[url(/base2.jpg)] bg-cover bg-center bg-fixed py-10 min-h-screen">
      {/* === NAVBAR (Same as Homepage) === */}
      <Navbar />

      {/* === CALENDAR === */}
      <div className="max-w-[80%] mx-auto mt-10 bg-white/60 rounded-3xl shadow-2xl backdrop-blur-md border border-white/30 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="p-2 bg-white/70 rounded-full shadow hover:bg-violet-100 transition"
          >
            <ChevronLeft className="text-violet-700" />
          </button>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-violet-700" />
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
              {format(currentMonth, "LLLL yyyy")}
            </h2>
          </div>

          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 bg-white/70 rounded-full shadow hover:bg-violet-100 transition"
          >
            <ChevronRight className="text-violet-700" />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-4 text-center text-sm font-semibold text-gray-700 uppercase">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="bg-violet-100/80 py-2 rounded-xl shadow-sm text-violet-800"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-4 mt-6">
          {weeks.flat().map((d, i) => {
            const inMonth = isSameMonth(d, monthStart);
            const todayHere = isSameDay(d, today);
            const sel = isSelected(d);

            let classes =
              "w-10 h-10 flex items-center justify-center rounded-full transition text-sm font-medium ";
            if (!inMonth) classes += "text-gray-400 opacity-50";
            if (sel)
              classes +=
                " bg-gradient-to-br from-violet-500 to-pink-400 text-white shadow-lg scale-105";
            else if (todayHere)
              classes +=
                " ring-2 ring-violet-500 text-violet-700 font-bold bg-white";
            else classes += " hover:bg-violet-100 hover:scale-105 text-gray-800";

            return (
              <div
                key={i}
                className="flex justify-center items-center cursor-pointer"
                onClick={() => inMonth && toggleDate(d)}
              >
                <div className={classes}>{format(d, "d")}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Dates */}
        <div className="mt-10 bg-white/40 rounded-2xl p-5 shadow-sm border border-white/30">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Selected Dates
          </h3>
          {selectedDates.length > 0 ? (
            <div className="flex flex-wrap gap-2 text-sm text-violet-700">
              {selectedDates.map((d, idx) => (
                <span
                  key={idx}
                  className="bg-violet-100 px-3 py-1 rounded-full shadow-sm"
                >
                  {format(d, "do MMM yyyy")}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              No dates selected. Tap any date to mark it.
            </p>
          )}
        </div>

        {/* Update Button */}
        <div className="flex justify-center mt-10">
          <Link to="/calendar/updates">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
              Update Today’s Log
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
