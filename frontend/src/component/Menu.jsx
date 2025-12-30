import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sty = 'flex p-2 bg-violet-50 shadow-md hover:scale-105 transition delay-50 duration-100 ease-in-out rounded-xl';

export const Menu = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/home', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => {
            if (res.status === 401) {
                window.location.href = '/login';
            }
            return res.json();
        })
        .then(data => {
            if (data?.name) {
                setUserName(data.name);
            }
        })
        .catch(err => {
            console.error('Error fetching username:', err);
        });
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const res = await response.json();

            if (res.message === "Logged out successfully") {
                window.location.href = '/login';
            } else {
                alert("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className='fixed right-24 mt-28 w-60 rounded-xl bg-white/90 shadow-lg '>
            <div className='flex gap-3 flex-col p-4 text-xl font-bold'>
                <div className={sty}>
                    <Link to='/home/profile' className='flex items-center'>
                        <button className='w-10 h-10 rounded-full bg-slate-200 outline outline-1 outline-black'>👤</button>
                        <button className='pl-4'>
                            {userName || 'User'}
                        </button>
                    </Link>
                </div>
                <div className={sty}>
                    <Link to='/home/help'>
                        <button className='w-10 h-10 rounded-full bg-slate-200 outline outline-1 outline-black font-semibold text-3xl'>i</button>
                        <button className='pl-4'>Help</button>
                    </Link>
                </div>
                <div className={sty}>
                    <Link to='/home/aboutus'>
                        <button className='w-10 h-10 rounded-full bg-slate-200 outline outline-1 outline-black font-semibold text-3xl'>?</button>
                        <button className='pl-4'>About Us</button>
                    </Link>
                </div>
                <div className={sty}>
                    <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-4'
                    >
                        <span className='w-10 h-10 rounded-full bg-slate-200 outline outline-1 outline-black flex items-center justify-center'>❌</span>
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Menu;