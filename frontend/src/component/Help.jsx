import React from 'react'
import { useState,useEffect } from 'react'
import Navbar from './Navbar'

const Help = () => {
const [open,setOpen]=useState(false);
useEffect(() => {
    fetch('http://localhost:5000/home/help', {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => {
        if (res.status === 401) {
            window.location.replace('/login');
        }
    });
}, []);
  const [faqOpen, setFaqOpen] = useState(null)

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  const faqs = [
    {
      question: 'How do I navigate through Systelle?',
      answer: 'Use the navigation bar at the top to access the Dashboard, Calendar, Health, and Exercise sections.'
    },
    {
      question: 'How can I update my health records?',
      answer: 'Go to the "Health" section and fill in your current stats. The data auto-saves as you update.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, all your data is stored securely and is only visible to you unless you choose to share it.'
    },
    {
      question: 'I forgot my login details. What do I do?',
      answer: 'Click on "Login" and then select "Forgot Password" to reset your credentials via email.'
    }
  ]

  return (
    <div className='bg-[url(/base2.jpg)] bg-cover bg-center bg-fixed py-10 min-h-screen'>
      {/* Navbar */}
      <Navbar />

      {/* Help Section */}
      <div className='max-w-4xl mx-auto mt-10 bg-white/90 p-8 rounded-xl shadow-xl backdrop-blur-md'>
        <h1 className='text-3xl font-bold text-center text-gray-700 mb-6'>Need Help?</h1>
        <p className='text-slate-600 text-center mb-10'>
          We’re here to support you! Find answers to common questions below, or contact our team for further assistance.
        </p>

        {/* FAQs */}
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='border border-indigo-200 rounded-xl overflow-hidden'>
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full text-left text-gray-700 px-5 py-3 font-medium bg-indigo-50 hover:bg-indigo-100 transition'
              >
                {faq.question}
              </button>
              {faqOpen === index && (
                <div className='px-5 py-4 text-gray-700 bg-white'>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className='mt-12 text-center'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-3'>Still need help?</h2>
          <p className='text-slate-600 mb-5'>
            Reach out to our support team for personalized assistance.
          </p>
          <a
            href='mailto:support@systelle.com'
            className='inline-block bg-violet-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-semibold'
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default Help
