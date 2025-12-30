import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Navbar from './Navbar';

export default function PeriodPain() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
              fetch('http://localhost:5000/health/PeriodPain', {
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
    <div className='bg-[url(/base2.jpg)] bg-cover bg-center bg-fixed py-10 min-h-screen'>

      {/* Navigation Bar */}
      <Navbar />

      {/* Page Content */}
      <div className="p-10 max-w-4xl mx-auto mt-10 bg-white/60 rounded-2xl shadow-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6">Why does it pain during periods?</h1>
        <ul className="list-disc text-lg space-y-3 ml-6">
          <li><strong>Period pain</strong> (menstrual cramps) is caused by uterine contractions to shed the lining.</li>
          <li>These contractions are triggered by <strong>prostaglandins</strong>, hormone-like chemicals.</li>
          <li><strong>Strong contractions</strong> can reduce blood flow and oxygen, causing cramping pain.</li>
          <li>Pain is usually felt in the <strong>lower abdomen, back, or thighs</strong>.</li>
          <li>Can be worse in <strong>younger people</strong>, or if conditions like <strong>endometriosis</strong> are present.</li>
        </ul>

        {/* Styled Back Button */}
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

