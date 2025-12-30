import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { ClipboardList } from "lucide-react";
import Navbar from "./Navbar";

const isactive =
  "bg-gradient-to-r from-pink-100 to-indigo-200 px-5 py-2 rounded-full shadow font-medium";
const inactive =
  "hover:bg-indigo-50 hover:shadow-md rounded-full px-5 py-2 font-medium transition duration-200 ease-in-out";
const btn4 =
  "rounded-xl bg-white/80 hover:bg-violet-100 hover:scale-105 min-w-[90px] text-sm font-medium text-gray-800 transition";
const btn2 =
  "rounded-xl bg-white/80 hover:bg-violet-100 hover:scale-105 min-w-[120px] text-sm font-medium text-gray-800 transition";
const selectedBtn =
  "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg scale-105";

export const DailyUpdate = () => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (questionKey, answer) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: answer }));
  };

  useEffect(() => {
    fetch("http://localhost:5000/calendar/updates", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 401) {
        window.location.replace("/login");
      }
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/calendar/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          flowing: answers.q1,
          spotting: answers.q2,
          feelings: answers.q3,
          pain_level: answers.q4,
          sleep_quality: answers.q5,
          energy: answers.q6,
          mind: answers.q7,
          skin: answers.q8,
          hair: answers.q9,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Update saved successfully!");
        navigate("/calendar");
      } else {
        alert("Failed to save update.");
      }
    } catch (error) {
      console.error("Error sending update:", error);
      alert("Server error");
    }
  };

  const renderQues = (key, ques, options) => (
    <div className="mt-4 bg-white/60 p-4 rounded-2xl shadow-md backdrop-blur-md border border-white/30">
      <div className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
        <ClipboardList className="text-violet-700" size={20} />
        {ques}
      </div>
      <div
        className={`grid ${
          options.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"
        } gap-3 justify-between`}
      >
        {options.map((opt) => (
          <button
            key={opt}
            className={`${options.length === 4 ? btn4 : btn2} ${
              answers[key] === opt ? selectedBtn : ""
            }`}
            onClick={() => handleSelect(key, opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[url(/base2.jpg)] bg-cover bg-center bg-fixed py-8 min-h-screen">
      {/* === NAVBAR === */}
      <Navbar />

      {/* === QUESTIONS CONTAINER === */}
      <div className="max-w-[85%] mx-auto mt-6 bg-white/50 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/30">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Daily Health & Cycle Update 🌸
        </h2>

        <div className="space-y-4">
          {renderQues("q1", "1. How was your flowing?", [
            "Light",
            "Medium",
            "Heavy",
            "Super Heavy",
          ])}
          {renderQues("q2", "2. Any Spotting or irregular spotting?", [
            "Yes",
            "No",
          ])}
          {renderQues("q3", "3. How are you feeling?", [
            "Mood Swing",
            "Not in control",
            "Fine",
            "Happy",
          ])}
          {renderQues("q4", "4. What is your pain level?", [
            "No pain",
            "Mild pain",
            "Moderate pain",
            "Severe pain",
          ])}
          {renderQues("q5", "5. How was your sleep quality?", [
            "Trouble falling asleep",
            "Woke up tired",
            "Restless",
            "Woke up refreshed",
          ])}
          {renderQues("q6", "6. How energetic are you today?", [
            "Exhausted",
            "Tired",
            "Ok",
            "Energetic",
          ])}
          {renderQues("q7", "7. How is your mind?", [
            "Forgetful",
            "Brain fog",
            "Calm",
            "Stress",
          ])}
          {renderQues("q8", "8. How do you feel about your skin?", [
            "Ok",
            "Good",
            "Acne",
            "Dry Skin",
          ])}
          {renderQues("q9", "9. How do you feel about your hair?", [
            "Good hair day",
            "Oily hair day",
            "Dry hair day",
            "Hair loss",
          ])}
        </div>

        {/* === SUBMIT BUTTON === */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 px-10 py-3 rounded-full shadow-lg text-lg font-bold text-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Submit Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyUpdate;
