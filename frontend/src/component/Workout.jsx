import React from 'react'
import { useState,useEffect } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Workout = () => {
  const [open, setOpen] = useState(false);
  const stretches = [
    {
      title: "Shoulder Stretch",
      steps: [
        "Raise right arm overhead.",
        "Lean your body gently.",
        "Hold for 15-20 seconds, change side.",
        "Repeat this for 2 mins.",
      ],
      image: "/shoulder.jpg",
    },
    {
      title: "Side Stretch",
      steps: [
        "Stand tall with feet shoulder-width apart.",
        "Raise your right arm overhead.",
        "Slowly bend to the left, keeping your core engaged.",
        "Hold for 15-20 seconds.",
        "Return to center and repeat on the other side.",
      ],
      image: "/stretch.jpg",
    },
    {
      title: "Neck Stretch",
      steps: [
        "Sit or stand tall.",
        "Gently tilt your head to the right (ear towards shoulder).",
        "Place your right hand on the left side of your head for a deeper stretch.",
        "Hold. Repeat on the other side.",
      ],
      image: "/neck.jpg",
    },
    {
      title: "Triceps Stretch",
      steps: [
        "Raise your right arm overhead.",
        "Bend the elbow so your hand touches the upper back.",
        "Use your left hand to gently push the elbow back.",
        "Hold. Switch arms.",
      ],
      image: "/tricep.jpg",
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
      
      <div className="text-right mr-6 mt-8 mb-6">
        <span className="text-purple-800 border-2 border-purple-500 px-4 py-1 rounded-full font-bold text-lg">
          Duration: 10 mins
        </span>
      </div>

      {stretches.map((stretch, index) => (
        <section key={index} className="mb-10">
          <div className="bg-white/50 p-6 rounded-2xl shadow-lg max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold bg-zinc-300 rounded-3xl text-gray px-6 py-2 w-max mx-auto mb-8">
              {stretch.title}
            </h3>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <ul className="text-lg space-y-4 ml-6 md:ml-12">
                {stretch.steps.map((step, i) => (
                  <li key={i}>Step {i + 1}: {step}</li>
                ))}
              </ul>

              <img src={stretch.image} alt={stretch.title} className="rounded-lg w-full max-w-sm mx-auto" />
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

export default Workout;