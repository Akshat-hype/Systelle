import React from 'react'
import { useState,useEffect } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const AboutUs = () => {
const [open,setOpen]=useState(false);
useEffect(() => {
    fetch('https://systelle.onrender.com/home/aboutus', {
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
        <Navbar />
        
              <div className="bg-white/50 mt-16 rounded-2xl max-w-[70%] mx-auto p-8 shadow-xl text-center text-gray-800">
        <h2 className="text-4xl font-bold underline mb-6">About us</h2>
        <p className="text-2xl text-centre font-italic mt-8">
          We are <strong>Systelle</strong> — a passionate group of five individuals united by one goal: to make women’s health tracking smarter, simpler, and more empowering.
          Our diverse team brings together skills from tech, design, and healthcare awareness to build a platform focused on PCOD and PCOS management. We believe that the right tools, when created with empathy and purpose, can truly change lives.
          Every feature we design is thoughtfully created with real women’s needs in mind. Whether it's tracking symptoms, understanding cycles, or building healthy habits — we’re here to support the journey.
          Together, at Systelle, we’re not just creating a product — we’re building a movement for better awareness, care, and support.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 pt-16">We’re here to support you — every day, every symptom, every step.</h3>
        <p className="text-3xl font-bold">. . . . . .</p>
      </div>
    </div>
  )
}

export default AboutUs;