import React from 'react'
import { useState,useEffect } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const LightCardio = () => {
  const [open, setOpen] = useState(false);
  const exercises = [
    {
      title: "March in Place",
      steps: [
        "Stand tall with feet hip-width apart.",
        "Lift one knee, then the other, as if walking in place.",
        "Swing your arms gently as you move.",
        "Keep a steady pace for 1–2 minutes.",
      ],
      image: "/march.jpg",
    },
    {
      title: "Arm Circles",
      steps: [
        "Extend both arms straight out to your sides.",
        "Begin small forward circles for 30 seconds.",
        "Switch to backward circles for another 30 seconds.",
        "Keep shoulders relaxed.",
      ],
      image: "/Arm.png",
    },
    {
      title: "Side Steps",
      steps: [
        "Stand with feet together.",
        "Step to the right and bring left foot in.",
        "Repeat left side — right foot follows.",
        "Move side-to-side continuously for 1–2 minutes.",
      ],
      image: "/Sidestep.jpg",
    },
    {
      title: "Neck Rolls",
      steps: [
        "Sit or stand in a relaxed position.",
        "Slowly drop your chin to your chest.",
        "Roll your head gently from side to side.",
        "Do 3-5 rolls in each direction.",
      ],
      image: "/NeckRoll.jpg",
    },
  ];
  return (
    <div className='bg-[url(/base2.jpg)] bg-cover bg-center py-10 min-h-screen'>
      <Navbar />

      {/* Exercises */}
            {exercises.map((item, index) => (
              <section key={index} className="mb-10">
              <div className="max-w-5xl mx-auto bg-white/50 p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold bg-zinc-300 rounded-3xl text-gray px-6 py-2 w-max mx-auto mb-8">
                  {item.title}
                </h3>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <ul className="text-lg space-y-4 ml-6 md:ml-12">
                    {item.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                  <img src={item.image} alt={item.title} className="rounded-xl w-full max-w-sm mx-auto" />
                </div></div>
              </section>
            ))}
      
            <div className="text-center mt-10">
                    <Link to='/exercise'>
                    <button className="bg-violet-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-violet-700 rounded-2xl text-white px-8 py-3 text-lg font-bold ">
                      Complete
                    </button>
                    </Link>
            </div>
    </div>
  )
}

export default LightCardio;