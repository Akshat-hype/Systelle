import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    cycleStart: "",
    cycleDuration: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user data from backend
  useEffect(() => {
    fetch("http://localhost:5000/home/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          window.location.replace("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setFormData({
          name: data?.name || "",
          dob: data?.dob || "",
          email: data?.email || "",
          cycleStart: data?.cycleStart || "",
          cycleDuration: data?.cycleDuration || "",
        });
      })
      .catch((err) => console.error("Error fetching profile:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update profile to backend
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:5000/home/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        alert("Profile updated successfully!");
        setEditing(false);
      } else {
        alert("Update failed. Try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-[url(/base2.jpg)] bg-cover bg-center bg-fixed min-h-screen py-10">
      <Navbar />

      <div className="max-w-[85%] mx-auto mt-8 mb-10 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-6 sm:p-8 transition-all">
        {loading ? (
          <div className="text-center py-12 text-gray-600 text-lg font-medium">
            Loading profile...
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center shadow-md text-3xl">
                👤
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
                My Profile
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage your personal and health details
              </p>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <ProfileField
                icon="👤"
                label="Name"
                name="name"
                value={formData.name}
                editing={editing}
                handleChange={handleChange}
              />
              <ProfileField
                icon="🗓"
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                type="date"
                editing={editing}
                handleChange={handleChange}
              />
              <ProfileField
                icon="✉"
                label="Email"
                name="email"
                value={formData.email}
                disabled
                handleChange={handleChange}
              />
              <ProfileField
                icon="📆"
                label="Cycle Start"
                name="cycleStart"
                value={formData.cycleStart}
                type="date"
                editing={editing}
                handleChange={handleChange}
              />
              <ProfileField
                icon="🩸"
                label="Cycle Duration (Days)"
                name="cycleDuration"
                value={formData.cycleDuration}
                type="number"
                editing={editing}
                handleChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transition"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg font-semibold py-2 px-8 rounded-full shadow-md hover:scale-105 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ✅ Reusable Field Component
const ProfileField = ({
  icon,
  label,
  name,
  value,
  type = "text",
  editing,
  disabled,
  handleChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        <div className="w-10 h-10 rounded-full bg-indigo-50 text-lg flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <span className="font-semibold text-gray-700">{label}</span>
      </div>

      {editing && !disabled ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full sm:w-auto border-b border-gray-300 focus:border-indigo-400 bg-transparent outline-none text-gray-800 p-1 text-sm sm:text-base"
        />
      ) : (
        <span className="text-gray-800 text-sm sm:text-base font-medium sm:text-right w-full sm:w-auto">
          {value || "..."}
        </span>
      )}
    </div>
  );
};

export default Profile;
