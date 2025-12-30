import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Navbar from './Navbar';

const isactive = 'bg-gradient-to-r from-pink-100 to-indigo-200 pl-5 pr-5 rounded-full max-h-14 my-auto';
const inactive = 'hover:bg-indigo-50 hover:shadow-lg rounded-full pr-5 pl-5 max-h-10 my-auto hover:scale-105 transition delay-100 duration-200 ease-in-out';

export default function Food() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
              fetch('http://localhost:5000/health/Food', {
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
    <div className='bg-[url("/base2.jpg")] bg-cover bg-center bg-fixed py-10 min-h-screen'>
      {/* Navbar */}
      <Navbar />
      
      {/* Content */}
      <div className="p-10 max-w-4xl mx-auto mt-10 bg-white/60 rounded-2xl shadow-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6">🥗 Top 10 Foods That Help With Period Cramps</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300 rounded-lg bg-white">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="p-3 text-lg font-semibold">Food</th>
                <th className="p-3 text-lg font-semibold">Benefit</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr><td className="p-3">1. Bananas</td><td className="p-3">Rich in magnesium & potassium — relax muscles.</td></tr>
              <tr className="bg-gray-50"><td className="p-3">2. Dark Chocolate (70%+)</td><td className="p-3">Contains magnesium — improves mood & eases cramps.</td></tr>
              <tr><td className="p-3">3. Leafy Greens (Spinach, Kale)</td><td className="p-3">High in iron — helps replenish blood loss.</td></tr>
              <tr className="bg-gray-50"><td className="p-3">4. Ginger</td><td className="p-3">Anti-inflammatory — reduces pain and nausea.</td></tr>
              <tr><td className="p-3">5. Salmon</td><td className="p-3">Omega-3 fatty acids — reduce inflammation.</td></tr>
              <tr className="bg-gray-50"><td className="p-3">6. Yogurt</td><td className="p-3">Rich in calcium — eases muscle tension.</td></tr>
              <tr><td className="p-3">7. Nuts & Seeds</td><td className="p-3">Magnesium and vitamin E — relieve pain and boost energy.</td></tr>
              <tr className="bg-gray-50"><td className="p-3">8. Pineapple</td><td className="p-3">Contains bromelain — relaxes muscles and reduces bloating.</td></tr>
              <tr><td className="p-3">9. Oats</td><td className="p-3">Provide iron and fiber — good for energy and digestion.</td></tr>
              <tr className="bg-gray-50"><td className="p-3">10. Chamomile Tea</td><td className="p-3">Soothes muscles, reduces anxiety, and improves sleep.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link to="/Health" className="inline-block px-6 py-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium shadow-md">← Back to Health</Link>
        </div>
      </div>
    </div>
  );
}
