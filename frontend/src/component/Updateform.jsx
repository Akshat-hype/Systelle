import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Updateform() {
const { handleSubmit, register, formState: { errors } } = useForm();
    useEffect(() => {
        fetch('http://localhost:5000/signup/form', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => {
            if (res.status === 401) {
                window.location.replace('/signup');
            }
        });
    }, []);
        const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/signup/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });
    
            const res = await response.json();
    
            if (res.success) {
                // Redirect to the home page
                window.location.href = res.redirectUrl;
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

  return (
    <div className="h-screen bg-gradient-to-br from-pink-100 to-indigo-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%] bg-white bg-opacity-70 backdrop-blur-md rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Update Us
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">• Name</label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              • Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              {...register("DOB", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">• Age</label>
            <input
              type="number"
              name="age"
              {...register("age", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your age"
              required
            />
          </div>

          {/* Cycle Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              • Number of days of menstrual cycle
            </label>
            <input
              type="number"
              name="cycleLength"
              {...register("TotalDays", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g., 28"
              required
            />
          </div>

          {/* Last Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              • When did you have your last period
            </label>
            <input
              type="date"
              name="lastPeriod"
              {...register("LastDate", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              • Your cycle last upto
            </label>
            <input
              type="number"
              name="LastUpto"
              {...register("LastsUpto", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g., 5"
              required
            />
          </div>
          
        </div>

        <input
          type="submit"
          value='Submit Your Details'
          className="mt-6 w-full py-3 bg-violet-600 flex justify-center transition delay-100 duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-violet-700 text-white font-bold rounded-3xl"
        />
          
        
      </form>
    </div>
  );
}
