import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Navbar from './Navbar';

export default function PeriodColor() {
  const [open, setOpen] = useState(false);
useEffect(() => {
            fetch('http://localhost:5000/health/PeriodColor', {
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
    <div className="bg-[url(/base2.jpg)] bg-cover bg-center bg-fixed py-10 min-h-screen">

      {/* Navigation Bar */}
      <Navbar />

      {/* Page Content */}
      <div className="p-10 max-w-4xl mx-auto mt-10 bg-white/60 rounded-2xl shadow-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6">What Does My Period Color Mean?</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="p-3 font-semibold border-r border-gray-300">Color</th>
                <th className="p-3 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              <tr className="border-t border-gray-300">
                <td className="p-3 font-medium text-red-600">Bright red</td>
                <td className="p-3">Fresh, steady flow – common at start of period</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-3 font-medium text-red-800">Dark red</td>
                <td className="p-3">Older blood, slower flow – often seen during sleep or later in cycle</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-3 font-medium text-brown-700">Brown/Black</td>
                <td className="p-3">Very old blood – leftover from previous days</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-3 font-medium text-pink-500">Pink</td>
                <td className="p-3">Lighter flow or mixed with cervical fluid – may happen at the beginning or end</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-3 font-medium text-orange-500">Orange</td>
                <td className="p-3">Mixed with discharge – could be a sign of infection if odor or itching is present</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-3 font-medium text-gray-600">Gray</td>
                <td className="p-3">Unusual – may indicate infection or miscarriage (see a doctor)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <Link
          to="/health"
          className="mt-8 inline-block px-6 py-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium shadow-md transition duration-200"
        >
          ← Back to Health
        </Link>
      </div>
    </div>
  );
}

