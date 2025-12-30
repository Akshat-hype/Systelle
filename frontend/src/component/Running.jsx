import React from 'react'
import { useState,useEffect } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Running = () => {
  const [open, setOpen] = useState(false);
  const exercises = [
    {
      title: "Warm-Up Jog",
      steps: [
        "Start by walking briskly for 1 minute.",
        "Transition into a light jog.",
        "Continue for 2–3 minutes.",
      ],
      image: "/WarmupJog.webp",
    },
    {
      title: "Interval Running",
      steps: [
        "Jog for 1 minute.",
        "Run at moderate speed for 30 seconds.",
        "Repeat this cycle 5 times.",
      ],
      image: "/intervalrun.jpg",
    },
    {
      title: "Steady Pace Run",
      steps: [
        "Maintain a comfortable running pace.",
        "Keep your breathing steady and deep.",
        "Run for 5 to 10 minutes depending on your stamina.",
      ],
      image: "/steadyrun.jpg",
    },
    {
      title: "Cool Down Walk",
      steps: [
        "Walk slowly after your run.",
        "Relax your arms and shoulders.",
        "Take deep breaths.",
        "Continue walking for 2–3 minutes.",
      ],
      image: "/CooldownWalk.webp",
    },
  ];
  useEffect(() => {
        fetch('http://localhost:5000/exercise/Workout', {
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
    <div className='bg-[url(/base2.jpg)] bg-cover bg-center py-10 min-h-screen'>
      <Navbar />

      {/* Exercise Cards */}
      {exercises.map((exercise, index) => (
        <section key={index} className="mb-10">
          <div className="bg-white/50 p-6 rounded-2xl shadow-lg max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold bg-zinc-300 rounded-3xl text-gray px-6 py-2 w-max mx-auto mb-8">
            {exercise.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <ul className="text-lg space-y-4 ml-6 md:ml-12">
              {exercise.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            <img src={exercise.image} alt={exercise.title} className="rounded-lg  h-56 w-full max-w-sm mx-auto" />
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

export default Running;